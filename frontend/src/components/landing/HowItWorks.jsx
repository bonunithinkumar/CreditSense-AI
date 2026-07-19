import { motion } from 'framer-motion'

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
    <section className="bg-[#F0EDE5] border-b border-border px-4 md:px-10 py-12 md:py-20" id="how-it-works">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] uppercase tracking-widest text-muted font-medium mb-3">
            Process
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink tracking-tight mb-2">
            How it works
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-md">
            A seamless flow from raw financial data to an actionable, fully-explained credit decision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
          {steps.map((step, index) => (
            <motion.div 
              key={step.num} 
              className="bg-surface p-6 hover:bg-white transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-serif text-3xl text-brand-soft">
                {step.num}
              </div>
              <h3 className="text-base font-medium text-ink mt-3 mb-1.5">
                {step.title}
              </h3>
              <p className="text-[13px] text-muted leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
