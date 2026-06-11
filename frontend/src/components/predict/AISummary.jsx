import { Sparkles } from 'lucide-react'

export default function AISummary({ summary }) {
  return (
    <div className="border-t border-border bg-[#F8F7F3] p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#27500A]" />
          <span className="text-[13px] font-semibold text-[#27500A]">AI summary</span>
        </div>
        <div className="bg-[#EAE8E2] text-[#27500A] text-[10px] font-medium px-2 py-0.5 rounded-full">
          Auto-generated
        </div>
      </div>
      <p className="text-[13px] text-ink leading-relaxed font-medium">
        {summary || "Waiting for prediction summary..."}
      </p>
    </div>
  )
}
