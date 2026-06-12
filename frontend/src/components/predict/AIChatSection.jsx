import { useState, useEffect } from 'react'
import { MessageSquareDot, ArrowUp, Sparkles, Leaf } from 'lucide-react'
import client from '../../api/client'
import useAuthStore from '../../store/authStore'

export default function AIChatSection({ context }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const { user } = useAuthStore()

  useEffect(() => {
    setHistory([])
  }, [context])

  // Context-aware placeholder based on top SHAP feature
  let topFeatureName = 'this result'
  if (context?.shap_values) {
    const sortedFeatures = Object.entries(context.shap_values).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    if (sortedFeatures.length > 0) {
      topFeatureName = sortedFeatures[0][0].replace('_', ' ')
    }
  }

  const probPercent = context?.probability ? Math.round(context.probability * 100) : 0
  const initialMessage = `I've analysed this borrower's profile. The ${probPercent}% default probability is driven mainly by ${topFeatureName}. Feel free to ask me anything about the result.`

  const handleSend = async (e, textOverride) => {
    if (e) e.preventDefault()
    const textToSend = textOverride || message
    if (!textToSend.trim()) return

    if (!user) {
      window.location.href = '/auth'
      return
    }

    setHistory(prev => [...prev, { role: 'user', content: textToSend }])
    setMessage('')
    setLoading(true)

    try {
      const res = await client.post('/chat', {
        question: textToSend,
        context: context
      })
      const replyText = res.data.reply || res.data.message || "I don't have a specific answer for that."
      setHistory(prev => [...prev, { role: 'assistant', content: replyText }])
    } catch (err) {
      console.error(err)
      setHistory(prev => [...prev, { role: 'assistant', content: "There was an error connecting to the AI. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    handleSend(null, suggestion)
  }

  return (
    <section className="px-10 pb-20 bg-page">
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted mb-4">
          Context-Aware AI Assistant
        </p>

        <div className="bg-surface border border-border rounded-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <MessageSquareDot className="w-5 h-5 text-[#27500A]" />
              <div>
                <h3 className="text-sm font-semibold text-ink">Ask about this prediction</h3>
                <p className="text-[11px] text-muted mt-0.5">Context-aware — knows your result, SHAP values, and summary</p>
              </div>
            </div>
            <div className="bg-[#EAE8E2] text-[#27500A] text-[11px] font-medium px-3 py-1 rounded-full">
              AI assistant
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-6 flex flex-col gap-6">

            {/* Initial AI Bubble */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#EAE8E2] flex items-center justify-center shrink-0">
                <Leaf className="text-brand-accent w-4 h-4" />
              </div>
              <div className="bg-[#F8F7F3] border border-border rounded-xl rounded-tl-none p-4 text-[13px] text-ink leading-relaxed max-w-[85%]">
                {initialMessage}
              </div>
            </div>

            {/* Chat History */}
            {history.map((msg, index) => (
              msg.role === 'user' ? (
                <div key={index} className="flex gap-4 items-start justify-end">
                  <div className="bg-[#27500A] text-white rounded-xl rounded-tr-none p-4 text-[13px] leading-relaxed max-w-[85%]">
                    {msg.content}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#27500A] text-white flex items-center justify-center shrink-0 text-xs font-medium">
                    {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
              ) : (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#EAE8E2] flex items-center justify-center shrink-0">
                    <Leaf className="text-brand-accent w-4 h-4" />
                  </div>
                  <div className="bg-[#F8F7F3] border border-border rounded-xl rounded-tl-none p-4 text-[13px] text-ink leading-relaxed max-w-[85%]">
                    {msg.content}
                  </div>
                </div>
              )
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#EAE8E2] flex items-center justify-center shrink-0">
                  <Leaf className="text-brand-accent w-4 h-4" />
                </div>
                <div className="bg-[#F8F7F3] border border-border rounded-xl rounded-tl-none p-4 text-[13px] text-ink leading-relaxed max-w-[85%]">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['What would lower this score?', 'Is the income too low?', 'Explain revolving utilization', 'How confident is the model?'].map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(sug)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full border border-[#C5D8B4] bg-[#F2F7EC] text-[#27500A] text-[11px] font-medium hover:bg-[#E6F0DB] transition-colors disabled:opacity-50"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-5 bg-surface border-t border-border rounded-b-xl">
            <form onSubmit={(e) => handleSend(e, null)} className="flex gap-3 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about this prediction..."
                className="flex-1 bg-surface border border-border rounded-lg pl-4 pr-12 py-3 text-[13px] text-ink focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#F8F7F3] border border-border rounded-md flex items-center justify-center disabled:opacity-50 hover:bg-[#EAE8E2] transition-colors text-[#27500A]"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
