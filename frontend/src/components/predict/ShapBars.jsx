export default function ShapBars({ shap_values }) {
  if (!shap_values) return null;

  // Sort by absolute value descending
  const sortedFeatures = Object.entries(shap_values).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

  // Find max absolute value for scaling
  const maxAbsVal = Math.max(...sortedFeatures.map(([_, val]) => Math.abs(val)));

  const formatFeatureName = (name) => {
    return name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  return (
    <div className="p-5">
      <p className="text-[10px] uppercase tracking-widest text-muted mb-3.5">
        Feature Impact
      </p>

      {sortedFeatures.map(([feature, val]) => {
        const width = maxAbsVal > 0 ? (Math.abs(val) / maxAbsVal) * 100 : 0;
        const isPositive = val > 0;

        return (
          <div key={feature} className="flex items-center gap-2.5 mb-2.5">
            <div className="text-[11px] text-muted w-24 truncate" title={formatFeatureName(feature)}>
              {formatFeatureName(feature)}
            </div>
            <div className="flex-1 h-1 bg-[#EDE9DF] rounded-full overflow-hidden flex">
              {/* If it's a positive SHAP value (raises risk), anchor left */}
              {/* If it's negative (lowers risk), anchor left but color green */}
              {/* Given simple absolute bar design described in prompt: */}
              <div
                className={`h-full rounded-full ${isPositive ? 'bg-risk-high' : 'bg-brand-mid'}`}
                style={{ width: `${width}%` }}
              ></div>
            </div>
            <div className={`text-[11px] font-medium w-8 text-right ${isPositive ? 'text-risk-high' : 'text-brand-mid'}`}>
              {isPositive ? '+' : ''}{val.toFixed(2)}
            </div>
          </div>
        )
      })}

      <div className="flex gap-3 mt-4 border-t border-border pt-3">
        <div className="flex items-center gap-1.5 text-[10px] text-muted">
          <div className="w-1.5 h-1.5 rounded-sm bg-risk-high"></div>
          Raises risk
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted">
          <div className="w-1.5 h-1.5 rounded-sm bg-brand-mid"></div>
          Lowers risk
        </div>
      </div>
    </div>
  )
}
