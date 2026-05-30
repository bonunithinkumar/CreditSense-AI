from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = "postgresql://bonukirankumar@localhost:5432/credit_scorer_db"
engine = create_engine(db_url)

session = sessionmaker(autocommit = False, autoflush=False, bind = engine)