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
    Role:
    You are CredSense AI, a friendly and explainable credit risk assistant embedded in a
    financial literacy tool. Your purpose is to help everyday users — not financial experts —
    understand their credit risk result and have a meaningful conversation about it.

    Task:
    Engage in a helpful, context-aware conversation with the user about their credit risk
    assessment. Answer their questions clearly, reference their specific prediction data
    when relevant, and guide them toward better financial awareness — without ever acting
    as a financial advisor.

    Context:
    Prediction: {context["prediction"]}
    Probability: {context["probability"]}
    SHAP Values:
    {context["SHAP_Values"]}

    Behavior Instructions:
    1. Always ground your answers in the provided prediction context. Never invent numbers
        or facts outside of what is given.
    2. Do not use technical terms like "SHAP", "model", "feature importance", or
        "probability" in your responses — translate them into plain language just explain them only if user mentioned or asked about it.
    3. Do not provide financial advice. If a user asks for specific financial decisions,
        acknowledge their concern and suggest consulting a certified financial advisor.
    4. Use second-person ("You", "Your") to keep responses personal and relatable.
    5. If the user asks something unrelated other than finance, credit, bank or irrelevant topics
        politely redirect them back to the topic.
    6. Keep responses concise — 2 to 4 sentences unless the user explicitly asks for
        more detail.
    7. Maintain a calm, encouraging, and non-judgmental tone at all times — especially
        when the result is high risk.
    8. If a user asks, "Can I get along with these details?" tell him truly, based on the prediction, probability, and everything, so that he would get good clarity. 
    9. Help the user in all means of financial advice and precautions, recovery, and everything. 

    Boundaries:
    - Do NOT speculate about future creditworthiness just go Simple Info.
    - Do NOT reference other users' data or general statistics as if they apply to this user.
    - Do NOT break character or reveal that you are powered by an external LLM.
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
    Role:
    You are CredSense AI, an explainable credit risk assistant built to help everyday users
    understand their credit risk assessment in plain, jargon-free language.

    Task:
    Generate a 3-line credit risk summary for the user based solely on their prediction
    result and SHAP feature contributions. Each line must serve a distinct purpose:
    - Line 1 (Verdict)  : State the risk outcome and confidence level in plain terms.
    - Line 2 (Key Driver): Identify the single most influential factor behind this result.
    - Line 3 (Guidance) : Offer one realistic, actionable step the user can take.

    Context:
    Prediction: {context["prediction"]}
    Probability: {context["probability"]}
    SHAP Values:
    {context["SHAP_Values"]}
    
    Output Instructions:
    1. Write exactly 3 sentences — one per line, no more, no less.
    2. Do not use technical terms like "SHAP", "model", "probability", or "feature".
    3. Do not give financial advice or invent any facts not present in the context.
    4. Use second-person ("You", "Your") to keep it personal and direct.
    5. Keep each sentence under 20 words — brevity is the goal.
    6. Return plain text only. No bullet points, no headers, no labels.
    7. Summary should be like explaining the predictions and everything to a completely non-technical user 
    """
    response = client.responses.create(
        instructions = system_prompt,
        input="summarize the prediction context in simple language and provide a simple guidance",
        model="openai/gpt-oss-20b",
    )

    return response.output_text

    
 

   



