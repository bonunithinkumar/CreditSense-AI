# CredSense AI 🍃

An explainable credit risk assessment platform powered by XGBoost, SHAP values, and an interactive LLM narration layer.

Live Demo : https://credsense-ai.vercel.app

---

## 🚀 Key Features

* **Interactive Risk Analyzer**: Input borrower financial profiles to receive real-time default risk predictions.
* **SHAP Explainability**: Breaks down the contribution of each financial metric, making predictions transparent.
* **AI Copilot**: An interactive, context-aware LLM assistant that translates technical parameters into jargon-free financial guidance.
* **Responsive Design**: Fully optimized for mobile and desktop viewports.

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite), Tailwind CSS
* **Backend**: FastAPI, PostgreSQL
* **ML & AI**: XGBoost Classifier, SHAP (SHapley Additive exPlanations), Groq API / LLMs

---

## ⚡ Quick Start with Docker

The easiest way to run the database, backend, and frontend together is using Docker:

1. Clone the repository.
2. Create a `.env` file in the `backend/` folder (see [Configuration](#-configuration) below).
3. Run the services:
   ```bash
   docker compose up --build
   ```
4. Open your browser to `http://localhost`.

---

## 🔧 Configuration

Create a `.env` file inside the `backend/` directory:
```env
DATABASE_URL=postgresql://bonukirankumar:password@db:5432/credit_scorer_db
SECRET_KEY=your_jwt_secret_key_here
GROQ_API_KEY=your_groq_api_key_here
```

---

## 💻 Local Development Setup

If you prefer to run the components manually:

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
```
*The API will be available at `http://localhost:8000`.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The app will be available at `http://localhost:5173`.*

---

Built with ❤️ by Nithin

