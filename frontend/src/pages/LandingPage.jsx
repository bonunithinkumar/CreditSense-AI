import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PredictForm from '../components/predict/PredictForm'
import ResultPanel from '../components/predict/ResultPanel'
import HeroSection from '../components/landing/HeroSection'
import StatBar from '../components/landing/StatBar'
import HowItWorks from '../components/landing/HowItWorks'
import TrustSection from '../components/landing/TrustSection'
import AIChatSection from '../components/predict/AIChatSection'
import client from '../api/client'
import useAuthStore from '../store/authStore'

export default function LandingPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (data) => {
    if (!useAuthStore.getState().user) {
      window.location.href = '/auth'
      return
    }

    setLoading(true)
    try {
      const response = await client.post('/predict', data)
      const responseData = response.data
      setResult({
        ...responseData,
        shap_values: responseData.SHAP_Values || responseData.shap_values
      })
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.detail || "Prediction failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-page flex flex-col font-sans">
      <div className="h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <StatBar />
      </div>

      <HowItWorks />

      <section className="px-10 pb-20 bg-page">
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

      {result && <AIChatSection context={result} />}

      <TrustSection />
      <Footer />
    </div>
  )
}
