import { Check } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-brand px-10 flex-1 flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full py-6 lg:py-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-widest text-brand-accent mb-4 lg:mb-6">
            Explainable AI · Credit Intelligence
          </p>

          <h1 className="font-serif text-5xl lg:text-6xl text-brand-base leading-tight">
            Not just a score.<br />
            An <em className="text-brand-accent italic">explanation</em><br />
            you can trust.
          </h1>

          <p className="text-base text-brand-base/65 leading-relaxed max-w-lg mt-4 lg:mt-6">
            CredSense provides deep insights into the factors driving every credit decision. Powered by advanced XGBoost and SHAP values, we ensure complete transparency for modern lending.
          </p>

          <div className="flex items-center gap-4 mt-6 lg:mt-10">
            <button 
              onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-accent text-[#173404] font-medium text-sm px-6 py-3 rounded-lg hover:bg-brand-soft transition-colors"
            >
              Start analyzing
            </button>
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-brand-base/25 text-brand-base/80 text-sm px-6 py-3 rounded-lg hover:bg-brand-base/10 transition-colors"
            >
              View documentation
            </button>
          </div>

          <div className="flex gap-6 text-[11px] text-brand-base/40 mt-6 lg:mt-10">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Real-time SHAP analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>FastAPI backend</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
