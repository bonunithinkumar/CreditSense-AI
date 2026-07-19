import { motion } from 'framer-motion'

export default function StatBar() {
  const stats = [
    { value: '150K+', label: 'borrower records trained on' },
    { value: '0.85', label: 'AUC-ROC on test set' },
    { value: '8', label: 'input features analyzed' },
    { value: 'SHAP', label: 'every decision explained' },
  ]

  return (
    <motion.div 
      className="bg-surface border-b border-border shrink-0 px-4 md:px-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 md:flex gap-x-4 gap-y-3 md:gap-x-0 md:gap-y-0 py-4 md:py-0">
        {stats.map((stat, i) => (
          <div key={i} className="py-2 md:py-6 md:pr-8 md:mr-8 md:border-r border-border last:border-0 md:last:border-r-0 flex-1">
            <div className="font-serif text-2xl md:text-[28px] text-brand tracking-tight">
              {stat.value}
            </div>
            <div className="text-[10px] md:text-xs text-muted mt-0.5 md:mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
