export default function InputCard({ title, subtitle, icon, children }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-4">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 bg-brand-tint rounded-lg flex items-center justify-center text-brand-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{title}</p>
          <p className="text-[11px] text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        {children}
      </div>
    </div>
  )
}
