export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Enter the profile',
      desc: 'Fill in 8 financial indicators',
    },
    {
      num: '02',
      title: 'Model scores it',
      desc: 'XGBoost predicts default probability',
    },
    {
      num: '03',
      title: 'SHAP explains why',
      desc: 'Each feature\'s contribution is ranked',
    },
    {
      num: '04',
      title: 'Ask the AI',
      desc: 'Plain-language answers about your result',
    },
  ]

  return (
    <section className="bg-[#F0EDE5] border-b border-border px-10 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-widest text-muted font-medium mb-3">
            Process
          </p>
          <h2 className="font-serif text-3xl text-ink tracking-tight mb-2">
            How it works
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-md">
            A seamless flow from raw financial data to an actionable, fully-explained credit decision.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {steps.map((step) => (
            <div key={step.num} className="bg-surface p-6">
              <div className="font-serif text-3xl text-brand-soft">
                {step.num}
              </div>
              <h3 className="text-base font-medium text-ink mt-3 mb-1.5">
                {step.title}
              </h3>
              <p className="text-[13px] text-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
