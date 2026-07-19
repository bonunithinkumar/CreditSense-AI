import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const codeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
  }

  const codeLines = [
    { text: '"prediction": "Approved",', color: 'text-brand-primary' },
    { text: '"confidence_score": 0.89,', color: 'text-ink' },
    { text: '"top_features": [', color: 'text-muted' },
    { text: '  { "feature": "income", "impact": "+0.15" },', color: 'text-ink' },
    { text: '  { "feature": "debt_ratio", "impact": "-0.04" }', color: 'text-ink' },
    { text: ']', color: 'text-muted' },
  ]

  return (
    <section className="bg-brand px-4 md:px-10 pt-28 pb-8 md:py-20 flex-1 flex flex-col justify-center overflow-hidden relative">
      {/* Dot Grid Pattern - Right Half */}
      <div
        className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto w-full py-4 md:py-6 lg:py-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="w-full md:w-1/2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-[11px] font-medium uppercase tracking-widest text-brand-accent mb-4 lg:mb-6">
            Explainable AI · Credit Intelligence
          </motion.p>

          <motion.h1 variants={itemVariants} className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-base leading-tight">
            Not just a score.<br />
            An <em className="text-brand-accent italic">explanation</em><br />
            you can trust.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-sm md:text-base text-brand-base/65 leading-relaxed max-w-lg mt-4 lg:mt-6">
            Enter a borrower's financial profile and get an instant risk score — with a clear breakdown of exactly what drove the decision.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 lg:mt-10">
            <button
              onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-accent text-[#173404] font-medium text-sm px-6 py-3 rounded-lg hover:bg-brand-soft transition-colors w-full sm:w-auto h-[44px] flex items-center justify-center"
            >
              Start analyzing
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-brand-base/25 text-brand-base/80 text-sm px-6 py-3 rounded-lg hover:bg-brand-base/10 transition-colors w-full sm:w-auto h-[44px] flex items-center justify-center"
            >
              View documentation
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-[11px] text-brand-base/40 mt-6 lg:mt-10">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Explainable AI insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Feature-level explanations</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Code Block Graphic */}
        <motion.div 
          className="w-full md:w-1/2 hidden md:flex justify-end"
          variants={codeVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-md bg-white border border-border rounded-xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              <span className="ml-2 text-[11px] font-medium text-muted tracking-wider font-mono">analysis_result.json</span>
            </div>
            
            <div className="font-mono text-[13px] leading-loose relative z-10">
              <div className="text-muted">{"{"}</div>
              {codeLines.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.15), duration: 0.4 }}
                  className={`pl-4 ${line.color}`}
                >
                  {line.text}
                </motion.div>
              ))}
              <div className="text-muted">{"}"}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
