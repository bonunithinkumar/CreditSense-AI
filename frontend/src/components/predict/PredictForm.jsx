import { useState, useRef, useEffect, useCallback } from 'react'
import { User, CreditCard, Sparkles, Info, LogIn, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import InputCard from './InputCard'
import useAuthStore from '../../store/authStore'

function FieldWithPopover({ label, name, value, onChange, placeholder, desc, type, onUseValue }) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)
  
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [popoverRef])

  const content = type === 'debt' ? {
    expl: "The percentage of your gross monthly income that goes towards paying your debts.",
    label1: "Total Monthly Debt ($)",
    label2: "Gross Monthly Income ($)",
  } : {
    expl: "The percentage of your total available credit that you are currently using.",
    label1: "Total Credit Used ($)",
    label2: "Total Credit Limit ($)",
  }

  const handleUse = () => {
    const v1 = parseFloat(val1)
    const v2 = parseFloat(val2)
    if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) {
      onUseValue((v1 / v2).toFixed(4))
      setIsOpen(false)
    }
  }

  return (
    <div className="flex flex-col gap-1.5 relative" ref={popoverRef}>
      <label className="text-[11px] font-medium text-muted tracking-wide flex items-center">
        {label}
        <button 
          type="button" 
          onClick={() => setIsOpen(!isOpen)} 
          className="ml-1.5 text-muted hover:text-ink transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </label>
      <input 
        type="number" 
        step="0.01" 
        name={name} 
        required 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors" 
      />
      <span className="text-[10px] text-muted/70">{desc}</span>

      {isOpen && (
        <div className="absolute left-0 top-[58px] w-64 max-w-[calc(100vw-3rem)] p-4 bg-surface border border-border shadow-md rounded-xl z-50">
          <p className="text-[11px] text-ink leading-relaxed mb-4">{content.expl}</p>
          <div className="flex flex-col gap-2.5">
            <div>
              <label className="text-[10px] text-muted block mb-1">{content.label1}</label>
              <input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="0" className="w-full bg-page border border-border rounded-lg px-2 py-1.5 text-xs text-ink focus:outline-none focus:border-brand-primary" />
            </div>
            <div>
              <label className="text-[10px] text-muted block mb-1">{content.label2}</label>
              <input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="0" className="w-full bg-page border border-border rounded-lg px-2 py-1.5 text-xs text-ink focus:outline-none focus:border-brand-primary" />
            </div>
            <button 
              type="button" 
              onClick={handleUse} 
              className="w-full mt-1 bg-brand-soft text-brand-primary border border-brand-primary/20 text-[11px] font-medium py-1.5 rounded-lg hover:bg-brand-tint transition-colors"
            >
              Use this value
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PredictForm({ onSubmit, loading }) {
  const { user } = useAuthStore()

  const [formData, setFormData] = useState({
    age: '',
    monthly_income: '',
    debt_ratio: '',
    revolving_utilization: '',
    open_credit_lines: '',
    real_estate_loans: '',
    dependents: '',
    late_30_59: '',
    late_60_89: '',
    late_90: ''
  })

  const computedDelinquencyScore = (Number(formData.late_30_59 || 0) * 1) + 
                                   (Number(formData.late_60_89 || 0) * 2) + 
                                   (Number(formData.late_90 || 0) * 3)

  const [showSignInGate, setShowSignInGate] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastDismissed, setToastDismissed] = useState(false)
  const toastTimerRef = useRef(null)

  const handleUseCalculatedValue = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (!user && !toastDismissed && !showToast) {
      setShowToast(true)
      toastTimerRef.current = setTimeout(() => setShowToast(false), 6000)
    }
  }, [user, toastDismissed, showToast])

  useEffect(() => () => clearTimeout(toastTimerRef.current), [])

  const dismissToast = () => {
    setShowToast(false)
    setToastDismissed(true)
    clearTimeout(toastTimerRef.current)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      setShowSignInGate(true)
      return
    }
    const data = {}
    for (const key in formData) {
      if (!['late_30_59', 'late_60_89', 'late_90'].includes(key)) {
        data[key] = Number(formData[key])
      }
    }
    data.delinquency_score = computedDelinquencyScore
    onSubmit(data)
  }

  return (
    <form className="flex-1" onSubmit={handleSubmit}>



      {/* Floating toast — fires on first keystroke for guests */}
      {showToast && (
        <div
          style={{ animation: 'slideInToast 0.35s cubic-bezier(0.16,1,0.3,1)' }}
          className="fixed top-5 right-5 z-[100] w-[300px] bg-white border border-border rounded-2xl shadow-xl p-4 flex gap-3"
        >
          <style>{`@keyframes slideInToast{from{opacity:0;transform:translateY(-16px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
          <div className="w-8 h-8 rounded-xl bg-brand-tint flex items-center justify-center shrink-0 mt-0.5">
            <LogIn className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-ink leading-tight">Sign in to analyse</p>
            <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
              Create a free account to run the risk analysis and save your history.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-brand-primary hover:underline"
            >
              <LogIn className="w-3 h-3" /> Sign in / Sign up →
            </Link>
          </div>
          <button type="button" onClick={dismissToast} className="text-muted hover:text-ink transition-colors shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sign-in gate — shown on submit when not signed in */}
      {showSignInGate && (
        <div className="mb-4 relative flex flex-col gap-3 p-4 bg-surface border-2 border-brand-primary/30 rounded-xl shadow-sm">
          <button
            type="button"
            onClick={() => setShowSignInGate(false)}
            className="absolute top-3 right-3 text-muted hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-tint flex items-center justify-center">
              <LogIn className="w-3.5 h-3.5 text-brand-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Almost there!</p>
              <p className="text-[11px] text-muted">Sign in to run the analysis. Your form data is saved.</p>
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <Link
              to="/auth"
              className="flex-1 bg-brand text-brand-base text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-brand/90 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in / Sign up
            </Link>
          </div>
        </div>
      )}
      <InputCard
        title="Personal & financial profile"
        subtitle="Basic borrower information"
        icon={<User className="w-4 h-4" />}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-muted tracking-wide">Age</label>
          <input type="number" name="age" required value={formData.age} onChange={handleChange} placeholder="e.g. 35" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors" />
          <span className="text-[10px] text-muted/70">Current age of the borrower</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-muted tracking-wide">Monthly Income</label>
          <input type="number" name="monthly_income" required value={formData.monthly_income} onChange={handleChange} placeholder="e.g. 45000" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors" />
          <span className="text-[10px] text-muted/70">Gross monthly income</span>
        </div>
        
        <FieldWithPopover 
          label="Debt Ratio"
          name="debt_ratio"
          type="debt"
          value={formData.debt_ratio}
          onChange={handleChange}
          placeholder="0.00 - 1.00"
          desc="Monthly debt ÷ income"
          onUseValue={(val) => handleUseCalculatedValue('debt_ratio', val)}
        />
        
        <FieldWithPopover 
          label="Revolving Utilization"
          name="revolving_utilization"
          type="revolving"
          value={formData.revolving_utilization}
          onChange={handleChange}
          placeholder="0.00 - 1.00"
          desc="Credit used vs. available"
          onUseValue={(val) => handleUseCalculatedValue('revolving_utilization', val)}
        />
      </InputCard>

      <InputCard
        title="Credit lines & obligations"
        subtitle="Current standing and accounts"
        icon={<CreditCard className="w-4 h-4" />}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-muted tracking-wide">Open Credit Lines</label>
          <input type="number" name="open_credit_lines" required value={formData.open_credit_lines} onChange={handleChange} placeholder="e.g. 6" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors" />
          <span className="text-[10px] text-muted/70">Number of open accounts</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-muted tracking-wide">Real Estate Loans</label>
          <input type="number" name="real_estate_loans" required value={formData.real_estate_loans} onChange={handleChange} placeholder="e.g. 1" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors" />
          <span className="text-[10px] text-muted/70">Mortgages / property loans</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium text-muted tracking-wide">Dependents</label>
          <input type="number" name="dependents" required value={formData.dependents} onChange={handleChange} placeholder="e.g. 2" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors" />
          <span className="text-[10px] text-muted/70">Financial dependents</span>
        </div>
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-2 mt-2 pt-3 border-t border-border">
          <div className="flex flex-col mb-1">
            <span className="text-[11px] font-medium text-ink tracking-wide">Late Payment History</span>
            <span className="text-[10px] text-muted">Number of times payments were late</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-medium text-muted">30–59 Days Late</label>
              <input type="number" name="late_30_59" required value={formData.late_30_59} onChange={handleChange} placeholder="0" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-medium text-muted">60–89 Days Late</label>
              <input type="number" name="late_60_89" required value={formData.late_60_89} onChange={handleChange} placeholder="0" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-medium text-muted">90+ Days Late</label>
              <input type="number" name="late_90" required value={formData.late_90} onChange={handleChange} placeholder="0" className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary transition-colors" />
            </div>
          </div>
          
          <div className="text-[11px] text-muted mt-1 flex items-center gap-1 cursor-help w-max" title="(30-59 Days × 1) + (60-89 Days × 2) + (90+ Days × 3)">
            Calculated delinquency score: <span className="font-medium text-ink">{computedDelinquencyScore}</span>
          </div>
        </div>
      </InputCard>

      {!user && !showSignInGate && (
        <div className="mt-3 p-3 bg-[#EAE8E2] rounded-lg text-[11px] text-muted/80 text-center border border-border">
          Sign in to save your prediction history.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand text-brand-base font-medium text-sm py-3 rounded-xl flex items-center justify-center gap-2 mt-5 hover:bg-brand/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-4 h-4 text-brand-accent" />
        {loading ? 'Analyzing...' : 'Analyze credit risk'}
      </button>
    </form>
  )
}
