import { ShieldCheck, Lock, Activity } from 'lucide-react'

export default function TrustSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />,
      title: "Bank-Grade Infrastructure",
      desc: "Deployed on enterprise-ready architecture ensuring high availability and robust data isolation."
    },
    {
      icon: <Lock className="w-5 h-5 text-brand-accent" />,
      title: "Encrypted Data Pipelines",
      desc: "All financial data is encrypted in transit and at rest using AES-256 and TLS 1.3."
    },
    {
      icon: <Activity className="w-5 h-5 text-brand-accent" />,
      title: "Real-Time Inference",
      desc: "FastAPI endpoints optimized to deliver XGBoost predictions and SHAP matrices in milliseconds."
    }
  ]

  return (
    <section className="bg-brand px-10 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-[11px] uppercase tracking-widest text-brand-accent font-medium mb-4">
            Trust & Security
          </p>
          <h2 className="font-serif text-3xl text-brand-base mb-4">
            Enterprise-ready security.
          </h2>
          <p className="text-sm text-brand-base/60 leading-relaxed max-w-xl mx-auto">
            We understand the sensitivity of credit data. Our platform is built from the ground up to protect borrower information and model integrity.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
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
