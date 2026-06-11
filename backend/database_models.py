
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey
from datetime import datetime

Base = declarative_base()

# Dedicated class for sqlalchemy to store Prediction Details in dd

class Predictions(Base):
    __tablename__ = "Predictions"

    id = Column(Integer, primary_key = True, index=True)

    user_id = Column(Integer, ForeignKey("Users.id"))
    
    prediction = Column(String)
    probability = Column(Float)

    top_reasons = Column(JSON)
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

class Users(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)