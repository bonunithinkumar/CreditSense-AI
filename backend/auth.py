from datetime import datetime, timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from sqlalchemy.orm import Session
from database import session
from database_models import Predictions
from database_models import Users

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

import os
from dotenv import load_dotenv
import uuid
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

load_dotenv()

secret_key = os.environ.get("SECRET_KEY")
algorithm = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES")
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

class CreateUserRequest(BaseModel):
    username: str
    password: str

class GoogleTokenRequest(BaseModel):
    token: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Dependency Injection
def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


# Sign up and create user
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(create_user_request: CreateUserRequest, db: db_dependency):
    
    create_user_model = Users(
        username = create_user_request.username,
        password = bcrypt_context.hash(create_user_request.password)
    )
    db.add(create_user_model)
    db.commit()

# Login and get token
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):

    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = create_access_token(user.username, user.id,timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES)))

    return {"access_token": token, "token_type": "bearer"}

@router.post("/google", response_model=Token)
async def google_auth(request: GoogleTokenRequest, db: db_dependency):
    try:
        import requests
        
        # Verify the access token by fetching user info
        response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {request.token}"}
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google token",
            )
            
        user_info = response.json()
        email = user_info.get("email")
        
        if not email:
            raise HTTPException(status_code=400, detail="Google token does not contain email")

        # Check if user exists
        user = db.query(Users).filter(Users.username == email).first()

        if not user:
            # Create a new user with a random dummy password
            dummy_password = str(uuid.uuid4())
            user = Users(
                username=email,
                password=bcrypt_context.hash(dummy_password)
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Create JWT token
        token = create_access_token(
            user.username, 
            user.id, 
            timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
        )

        return {"access_token": token, "token_type": "bearer"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google authentication failed: {str(e)}",
        )



def authenticate_user(username: str, password: str, db: Session):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {
        "sub": username,
        "user_id": user_id,}
    expire = datetime.utcnow() + expires_delta
    encode.update({"exp": expire})
    return jwt.encode(encode, secret_key, algorithm=algorithm)

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate user",)
        
        return {"username": username, "user_id": user_id}
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user",)