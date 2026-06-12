import joblib
from pydantic import BaseModel

feature_names = joblib.load("files/feature_names.pkl")
print(feature_names)

class Input(BaseModel):
    age: int
    monthly_income: int
    open_credit_lines: int
    real_estate_loans: int
    dependents: int
    debt_ratio: float
    revolving_utilization: float
    delinquency_score: int

class User(BaseModel):
    id: int
    name: str
    email: str

class ChatRequest(BaseModel):
    question: str
    context: dict

class SummaryRequest(BaseModel):
    context: dict
