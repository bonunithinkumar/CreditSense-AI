import { BarChart, MessageSquareDot, History } from 'lucide-react'

export default function AuthLeftPanel() {
  const features = [
    {
      icon: <BarChart className="w-4 h-4 text-brand-accent" />,
      title: "SHAP-powered breakdowns",
      desc: "See which features drove each prediction"
    },
    {
      icon: <MessageSquareDot className="w-4 h-4 text-brand-accent" />,
      title: "Context-aware AI chat",
      desc: "Ask anything about a result"
    },
    {
      icon: <History className="w-4 h-4 text-brand-accent" />,
      title: "Full prediction history",
      desc: "Every analysis logged to your account"
    }
  ]

  return (
    <div className="flex-1 bg-brand p-12 flex flex-col relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-[10px] font-medium uppercase tracking-widest text-brand-accent mb-6">
          Trusted credit intelligence
        </p>
        <h1 className="font-serif text-[32px] text-brand-base leading-snug">
          Understand the why behind<br />every credit decision.
        </h1>
        <p className="text-[13px] text-brand-base/60 leading-relaxed max-w-[280px] mt-4">
          CredSense provides full transparency for modern lenders and financial institutions.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-12 relative z-10">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3.5">
            <div className="w-8 h-8 bg-brand-accent/15 rounded-lg flex items-center justify-center shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-brand-base/90 mb-1">{f.title}</h3>
              <p className="text-[12px] text-brand-base/50 leading-relaxed max-w-[240px]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-10 relative z-10">
        <p className="text-[10px] text-brand-base/30 uppercase tracking-widest font-medium">
          Built with XGBoost · SHAP · FastAPI
        </p>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute left-0 top-0 w-48 h-48 bg-brand-soft/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  )
}
