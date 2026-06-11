import { ShieldAlert } from 'lucide-react'
import ShapBars from './ShapBars'
import AISummary from './AISummary'

export default function ResultPanel({ result, loading }) {
  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-xl overflow-hidden sticky top-4 w-72 h-64 flex flex-col items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-muted">Analyzing profile...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="bg-surface border border-dashed border-border rounded-xl p-8 sticky top-4 w-72 flex flex-col items-center justify-center text-center h-[400px]">
        <ShieldAlert className="w-8 h-8 text-muted/50 mb-3" />
        <p className="text-sm text-muted">Fill in the profile and click analyze to see the result</p>
      </div>
    )
  }

  const prob = result.probability
  const probPercent = Math.round(prob * 100)

  // Determine risk scheme
  let riskScheme = {}
  if (prob > 0.60) {
    riskScheme = {
      bg: 'bg-risk-bg',
      border: 'border-risk-border',
      badgeBg: 'bg-risk-bg',
      badgeText: 'text-[#791F1F]',
      verdict: 'High Risk',
      probColor: 'text-risk-high',
      fillBg: 'bg-risk-high',
      barBg: 'bg-risk-border'
    }
  } else if (prob >= 0.40 && prob <= 0.60) {
    riskScheme = {
      bg: 'bg-[#FAEEDA]',
      border: 'border-[#FAC775]',
      badgeBg: 'bg-[#FAEEDA]',
      badgeText: 'text-[#BA7517]',
      verdict: 'Medium Risk',
      probColor: 'text-[#BA7517]',
      fillBg: 'bg-[#BA7517]',
      barBg: 'bg-[#FAC775]'
    }
  } else {
    riskScheme = {
      bg: 'bg-brand-tint',
      border: 'border-brand-soft',
      badgeBg: 'bg-brand-tint',
      badgeText: 'text-brand-primary',
      verdict: 'Low Risk',
      probColor: 'text-brand-primary',
      fillBg: 'bg-brand-primary',
      barBg: 'bg-brand-soft'
    }
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden sticky top-4 w-72">
      <div className={`${riskScheme.bg} border-b ${riskScheme.border} p-5`}>
        <div className={`inline-flex items-center gap-1 ${riskScheme.badgeBg} ${riskScheme.badgeText} text-[10px] font-medium uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${riskScheme.border}`}>
          {riskScheme.verdict}
        </div>

        <h3 className="font-serif text-xl text-ink mt-2.5">
          {riskScheme.verdict}
        </h3>
        <p className="text-[12px] text-muted mb-3.5">
          Based on our XGBoost model analysis
        </p>

        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-[11px] text-muted/80">Default Probability</span>
          <span className={`font-serif text-[22px] ${riskScheme.probColor}`}>{probPercent}%</span>
        </div>

        <div className={`h-1.5 ${riskScheme.barBg} rounded-full overflow-hidden`}>
          <div
            className={`h-full ${riskScheme.fillBg} rounded-full`}
            style={{ width: `${probPercent}%` }}
          ></div>
        </div>
      </div>

      <ShapBars shap_values={result.shap_values} />

      <AISummary summary={result.summary} />
    </div>
  )
}
