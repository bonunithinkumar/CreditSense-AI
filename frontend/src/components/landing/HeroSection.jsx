import { Check } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-brand px-4 md:px-10 pt-28 pb-8 md:py-20 flex-1 flex flex-col justify-center overflow-hidden relative">

      {/* Dot Grid Pattern - Right Half */}
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto w-full py-4 md:py-6 lg:py-12 relative z-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-widest text-brand-accent mb-4 lg:mb-6">
            Explainable AI · Credit Intelligence
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-base leading-tight">
            Not just a score.<br />
            An <em className="text-brand-accent italic">explanation</em><br />
            you can trust.
          </h1>

          <p className="text-sm md:text-base text-brand-base/65 leading-relaxed max-w-lg mt-4 lg:mt-6">
            Enter a borrower's financial profile and get an instant risk score — with a clear breakdown of exactly what drove the decision.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 lg:mt-10">
            <button
              onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-accent text-[#173404] font-medium text-sm px-6 py-3 rounded-lg hover:bg-brand-soft transition-colors w-full sm:w-auto h-[44px] flex items-center justify-center"
            >
              Start analyzing
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-brand-base/25 text-brand-base/80 text-sm px-6 py-3 rounded-lg hover:bg-brand-base/10 transition-colors w-full sm:w-auto h-[44px] flex items-center justify-center"
            >
              View documentation
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-[11px] text-brand-base/40 mt-6 lg:mt-10">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Explainable AI insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Feature-level explanations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
