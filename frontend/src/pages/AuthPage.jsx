import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import AuthLeftPanel from '../components/auth/AuthLeftPanel'
import AuthFormCard from '../components/auth/AuthFormCard'
import useAuthStore from '../store/authStore'

export default function AuthPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <nav className="bg-surface border-b border-border h-[72px] px-10 flex items-center shrink-0">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand flex items-center justify-center rounded-lg">
              <Leaf className="text-brand-accent w-4 h-4" />
            </div>
            <span className="font-medium text-brand-primary text-lg tracking-tight">
              Cred<span className="text-brand-accent">Sense</span>
            </span>
          </div>
          <Link to="/" className="text-sm font-medium text-muted hover:text-ink transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-[960px] w-full flex bg-surface border border-border rounded-2xl shadow-sm overflow-hidden min-h-[560px]">
          <div className="hidden md:flex flex-1">
            <AuthLeftPanel />
          </div>
          <div className="w-full md:w-[420px] p-10 flex items-center justify-center bg-surface border-l border-border">
            <AuthFormCard />
          </div>
        </div>
      </div>
    </div>
  )
}
