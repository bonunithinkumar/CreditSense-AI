import { useState } from 'react'
import { MessageSquareDot, ArrowUp } from 'lucide-react'
import client from '../../api/client'

export default function AIChatZone({ context }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState(null)

  // Context-aware placeholder based on top SHAP feature
  let topFeatureName = 'this result'
  if (context?.shap_values) {
    const sortedFeatures = Object.entries(context.shap_values).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    if (sortedFeatures.length > 0) {
      topFeatureName = sortedFeatures[0][0].replace('_', ' ')
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      // Expected POST /chat
      const res = await client.post('/chat', {
        message,
        prediction_context: context
      })
      // Assuming res.data.reply exists
      setReply(res.data.reply || res.data.message || "I don't have a specific answer for that.")
    } catch (err) {
      console.error(err)
      setReply("There was an error connecting to the AI. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-border bg-brand-tint p-5">
      <div className="flex items-center gap-1.5 mb-2.5">
        <MessageSquareDot className="w-4 h-4 text-brand-primary" />
        <span className="text-[12px] font-medium text-[#27500A]">Ask the AI about this result</span>
      </div>

      <form onSubmit={handleSend} className="flex gap-2 items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Why did ${topFeatureName} impact my score?`}
          className="flex-1 bg-surface border border-brand-soft rounded-lg px-3 py-2 text-[12px] focus:outline-none focus:border-brand-primary transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center disabled:opacity-50 transition-opacity"
        >
          <ArrowUp className="text-brand-accent w-3.5 h-3.5" />
        </button>
      </form>

      {reply && (
        <div className="mt-3 p-3 bg-surface border border-brand-soft rounded-lg text-[12px] text-ink leading-relaxed">
          {reply}
        </div>
      )}

      <p className="text-[10px] text-muted mt-2 text-center">
        Context-aware — answers reference your specific result
      </p>
    </div>
  )
}
