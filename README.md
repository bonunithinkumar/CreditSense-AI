# CredSense AI 🍃

Not just a score. An **explanation** you can trust.

## 📌 Problem Statement
Traditional credit scoring models often act as "black boxes," providing borrowers with a single numerical score without explaining the underlying reasons for their credit risk assessment. This lack of transparency leads to confusion, frustration, and a lack of actionable feedback, leaving people unsure of how they can improve their financial standing.

## 💡 The Solution
**CredSense AI** bridges the gap between complex machine learning and financial literacy. We provide deep insights into the factors driving every credit decision. 

Powered by advanced **XGBoost** and **SHAP (SHapley Additive exPlanations)** values, our platform ensures complete transparency for modern lending by breaking down exactly *why* a decision was made. Additionally, our integrated, context-aware AI Assistant helps everyday users understand their risk results in simple, jargon-free language and provides actionable guidance to improve their financial health.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Zustand
- **Backend:** FastAPI, Python, SQLAlchemy, JWT Authentication
- **Machine Learning:** XGBoost, SHAP
- **AI Integration:** LLM-powered conversational agent and dynamic summarization

---

## 🚀 Getting Started

Follow these simple steps to clone the repository and run CredSense AI locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Credit-scorer.git
cd Credit-scorer
```

### 2. Backend Setup
Navigate to the backend directory, install the required Python packages, and start the FastAPI server:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```
*Note: Make sure to create a `.env` file in the `backend` directory with your environment variables (e.g., `DATABASE_URL`, API Keys, and JWT Secret Key).*

Run the backend server:
```bash
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install the dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
The frontend application will be available at `http://localhost:5173` (or the port specified by Vite).

---

Built with ❤️ by Nithin
