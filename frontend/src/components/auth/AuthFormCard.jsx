import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import client from '../../api/client'

export default function AuthFormCard() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMsg('')

    try {
      if (isLogin) {
        const params = new URLSearchParams()
        params.append('username', email)
        params.append('password', password)
        const res = await client.post('/auth/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        const { access_token } = res.data
        login(access_token, { email })
        navigate('/')
      } else {
        await client.post('/auth/', { username: email, password })
        setIsLogin(true)
        setSuccessMsg('Account created successfully! Please sign in.')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || 'Authentication failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[340px]">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-widest text-muted mb-1.5 font-medium">
          {isLogin ? 'Welcome back' : 'Get started'}
        </p>
        <h2 className="font-serif text-[28px] text-ink mb-2 leading-tight">
          {isLogin ? 'Sign in to account' : 'Create account'}
        </h2>
        <p className="text-[13px] text-muted leading-relaxed">
          Enter your details to access the credit intelligence platform.
        </p>
      </div>

      <button className="w-full bg-page border border-border rounded-xl py-2.5 flex items-center justify-center gap-2 text-[13px] font-medium text-ink mb-6 hover:bg-border/50 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-[11px] text-muted/60 uppercase tracking-wide font-medium">or email</span>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[11px] font-medium text-muted tracking-wide">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-2">
          <label className="text-[11px] font-medium text-muted tracking-wide">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-page border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-primary focus:bg-surface transition-colors"
          />
        </div>

        {isLogin && (
          <div className="text-right mb-5">
            <a href="#" className="text-[11px] font-medium text-brand-primary hover:underline">Forgot password?</a>
          </div>
        )}

        {error && <p className="text-[11px] text-risk-high mt-2 mb-3 bg-risk-low/20 p-2 rounded">{error}</p>}
        {successMsg && <p className="text-[11px] text-[#27500A] mt-2 mb-3 bg-[#EAE8E2] p-2 rounded">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand text-brand-base text-sm font-medium py-2.5 rounded-xl mt-2 hover:bg-brand/90 transition-colors disabled:opacity-70"
        >
          {loading ? 'Processing...' : isLogin ? 'Sign in to CredSense' : 'Create account'}
        </button>
      </form>

      <div className="text-center text-[12px] text-muted mt-6">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-brand-primary font-medium hover:underline">
          {isLogin ? 'Create one free' : 'Sign in'}
        </button>
      </div>
    </div>
  )
}
