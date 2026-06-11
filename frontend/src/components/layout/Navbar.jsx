import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, ChevronDown, LogOut } from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    navigate('/auth')
  }

  return (
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

        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm text-muted hover:text-ink transition-colors">Home</Link>
          <Link to="/" className="text-sm text-muted hover:text-ink transition-colors">About</Link>
          <Link to="/" className="text-sm text-muted hover:text-ink transition-colors">How it works</Link>
        </div>

        <div>
          {!user ? (
            <Link
              to="/auth"
              className="flex items-center gap-2 text-brand-primary font-medium text-sm px-4 py-2 border border-brand-soft rounded-lg bg-brand-tint hover:bg-brand-soft/20 transition-colors"
            >
              Login / Sign up
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-brand-tint text-brand-primary flex items-center justify-center text-sm font-medium border border-brand-soft">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-ink">{user?.email?.split('@')[0] || 'User'}</span>
                <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-surface border border-border rounded-xl shadow-md overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border bg-page/50">
                    <p className="text-[10px] font-medium text-muted uppercase tracking-wider">Signed in as</p>
                    <p className="text-[12px] text-ink truncate mt-0.5 font-medium">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-risk-high font-medium hover:bg-page flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
