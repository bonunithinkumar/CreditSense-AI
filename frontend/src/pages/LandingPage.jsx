import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PredictForm from '../components/predict/PredictForm'
import ResultPanel from '../components/predict/ResultPanel'
import HeroSection from '../components/landing/HeroSection'
import StatBar from '../components/landing/StatBar'
import HowItWorks from '../components/landing/HowItWorks'
import TrustSection from '../components/landing/TrustSection'

export default function LandingPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = (data) => {
    setLoading(true)
    setTimeout(() => {
      setResult({
        probability: 0.72,
        prediction: 1,
        shap_values: {
          debt_ratio: 0.15,
          revolving_utilization: 0.22,
          monthly_income: -0.05,
          age: -0.08,
          open_credit_lines: 0.03,
          real_estate_loans: -0.02,
          dependents: 0.04,
          delinquency_score: 0.12
        }
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-page flex flex-col font-sans">
      <div className="h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <StatBar />
      </div>

      <HowItWorks />

      <section className="px-10 py-20 bg-page">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted mb-6">
            Risk analyzer
          </p>
          <div className="flex gap-10 items-start">
            <PredictForm onSubmit={handleAnalyze} loading={loading} />
            <ResultPanel result={result} loading={loading} />
          </div>
        </div>
      </section>

      <TrustSection />
      <Footer />
    </div>
  )
}
