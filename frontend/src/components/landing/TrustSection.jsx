import { ShieldCheck, Lock, Activity } from 'lucide-react'
import { BrainCircuit } from "lucide-react"
import { BarChart2 } from "lucide-react"
import { MessageSquareText } from "lucide-react"

export default function TrustSection() {
  const features = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-brand-accent" />,
      title: "XGBoost Classifier",
      desc: "Trained on 150K+ real borrower records. Optimized for imbalanced data using scale_pos_weight."
    },
    {
      icon: <BarChart2 className="w-5 h-5 text-brand-accent" />,
      title: "SHAP Explainability",
      desc: "Every prediction is broken down by feature contribution — no black box decisions."
    },
    {
      icon: <MessageSquareText className="w-5 h-5 text-brand-accent" />,
      title: "LLM Narration Layer",
      desc: "SHAP values are translated into plain English so anyone can understand the result."
    }
  ]

  return (
    <section className="bg-brand px-4 md:px-10 py-12 md:py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-[11px] uppercase tracking-widest text-brand-accent font-medium mb-4">
            UNDER THE HOOD
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-base mb-4">
            What makes it work.
          </h2>
          <p className="text-xs md:text-sm text-brand-base/60 leading-relaxed max-w-xl mx-auto">
            A machine learning pipeline built end-to-end — from raw data to plain-English decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-brand-primary/20 border border-brand-primary/30 p-8 rounded-xl text-center">
              <div className="w-12 h-12 bg-brand/50 rounded-full flex items-center justify-center mx-auto mb-5">
                {f.icon}
              </div>
              <h3 className="text-brand-base font-medium text-[15px] mb-2">{f.title}</h3>
              <p className="text-brand-base/60 text-[13px] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
