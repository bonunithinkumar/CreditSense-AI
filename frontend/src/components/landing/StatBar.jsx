export default function StatBar() {
  const stats = [
    { value: '150K+', label: 'borrower records trained on' },
    { value: '0.85', label: 'AUC-ROC on test set' },
    { value: '8', label: 'input features analyzed' },
    { value: 'SHAP', label: 'every decision explained' },
  ]

  return (
    <div className="bg-surface border-b border-border shrink-0 px-10">
      <div className="max-w-6xl mx-auto w-full flex">
        {stats.map((stat, i) => (
          <div key={i} className="flex-1 border-r border-border py-6 pr-8 mr-8 last:border-r-0 last:mr-0 last:pr-0">
            <div className="font-serif text-[28px] text-brand tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs text-muted mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
