import pickle
import joblib
import pandas as pd

from models import Input
from models import ChatRequest
from models import SummaryRequest

from fastapi import FastAPI, Depends
from database import session, engine

from fastapi.middleware.cors import CORSMiddleware

import database_models
from database_models import Predictions

from sqlalchemy.orm import Session

import auth
from auth import get_current_user

from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI
import os


app = FastAPI()
app.include_router(auth.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
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

# Ai chat
@app.post("/chat")
def chat(data: ChatRequest, user = user_dependency):
    reply=get_bot_reply(
        data.question,
        data.context
        )
    return {"reply": reply}
    
def get_bot_reply(user_question, context):
    message = user_question.lower()

    system_prompt = f"""
    You are CredSense AI.

    You are an explainable credit-risk assistant.

    Use ONLY the provided prediction context.

    Prediction: {context["prediction"]}
    Probability: {context["probability"]}

    SHAP Values:
    {context["SHAP_Values"]}

    Explain in simple language.
    Do not provide financial advice.
    Do not invent facts.
    Reference the prediction and SHAP values.
    """

    response = client.responses.create(
        instructions = system_prompt,
        input=user_question,
        model="openai/gpt-oss-20b",
    )

    return response.output_text

# Get Ai summary 
@app.post("/aisummary")
def aisummary(data: SummaryRequest, user = user_dependency):
    summary = get_summary(data.context)
    return {"Summary": summary}

def get_summary(context):
    system_prompt = f"""
    You are CredSense AI.

    You are an explainable credit-risk assistant.

    Use ONLY the provided prediction context.

    Prediction: {context["prediction"]}
    Probability: {context["probability"]}

    SHAP Values:
    {context["SHAP_Values"]}

    Summarize the prediction and SHAP values in simple language.
    Do not provide financial advice.
    Do not invent facts.
    Reference the prediction and SHAP values.
    Note : just return a simple paragraph overview of their prediction context and provide a simple guidance   
    """

    response = client.responses.create(
        instructions = system_prompt,
        input="summarize the prediction context in simple language and provide a simple guidance",
        model="openai/gpt-oss-20b",
    )

    return response.output_text

    
 

   



