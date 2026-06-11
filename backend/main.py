import pickle
import joblib
import pandas as pd

from models import Input

from fastapi import FastAPI, Depends
from database import session, engine

from fastapi.middleware.cors import CORSMiddleware

import database_models
from database_models import Predictions

from sqlalchemy.orm import Session

import auth
from auth import get_current_user


app = FastAPI()
app.include_router(auth.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("files/credit_risk_model.pkl")
feature_names = joblib.load("files/feature_names.pkl")
shap_explainer = joblib.load("files/shap_explainer.pkl")

# Welcome message
@app.get("/")
def greet():
    return "Welcome to My world - 'Started Backend'"

@app.get("/health")
def health_check():
    return "Status: Healthy"

database_models.Base.metadata.create_all(bind=engine)

# Dependency Injection
def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()
db_dependency = Depends(get_db)
user_dependency = Depends(auth.get_current_user)


# post - create
@app.post("/predict")
def predict_defaulter(data: Input, user = user_dependency, db: Session = Depends(get_db)):

    data = pd.DataFrame([data.model_dump()])
    data = data[feature_names]

    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]
    shap_values = shap_explainer(data)

    print(shap_values.values)

    shap_dict = {
        feature: float(value)
        for feature, value in zip(
            feature_names,
            shap_values.values[0]
        )
    }
    print(shap_dict)

    if prediction == 1:
        prediction = "Defaulter"
    else:
        prediction = "Non-Defaulter"

    prediction_record = Predictions(
        user_id=user["user_id"],
        prediction=prediction,
        probability=float(probability),
        top_reasons=top3_reasons(shap_dict)
    )

    db.add(prediction_record)
    db.commit()

    return {
        "prediction": prediction,
        "probability": float(probability),
        "SHAP_Values": shap_dict
    }

def top3_reasons(shap_dict):
    top_reasons = dict(
        sorted(
            shap_dict.items(),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:3]
    )
    return list(top_reasons.keys())

# initially mana daggara sample data unte - danni db lo store cheyyali ante idhi vaduthamu
"""     
def init_db():
    db = session()

    count = db.query(database_models.Product).count

    if count==0:
        for product in products:
            db.add(database_models.Product(**product.model_dump()))

        db.commit()

init_db()
"""
