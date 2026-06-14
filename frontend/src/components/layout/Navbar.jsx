import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, ChevronDown, LogOut } from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
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
    <nav 
      ref={navRef}
      className={`transition-colors duration-200 ${
        isMobileMenuOpen 
          ? 'bg-white/95 border-b border-border/80' 
          : 'bg-white/10 border-b border-white/20'
      } backdrop-blur-md md:bg-surface md:border-b md:border-border h-[72px] px-4 md:px-10 flex items-center shrink-0 relative z-50 w-full`}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand flex items-center justify-center rounded-lg">
            <Leaf className="text-brand-accent w-4 h-4" />
          </div>
          <span className="font-medium text-brand-primary text-lg tracking-tight">
            Cred<span className="text-brand-accent">Sense</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-muted hover:text-ink transition-colors">Home</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-muted hover:text-ink transition-colors">About</button>
          <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-muted hover:text-ink transition-colors">How it works</button>
        </div>

        <div className="hidden md:block">
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

        {/* Mobile Hamburger button */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-brand-primary transition-all duration-200 focus:outline-none ${
              isMobileMenuOpen 
                ? 'bg-black/5 border border-black/10 hover:bg-black/10' 
                : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // ✕ Icon SVG
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // ☰ Icon SVG
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav Panel */}
      <div 
        className={`absolute top-[76px] left-2 right-2 md:hidden z-50 bg-white/95 backdrop-blur-md border border-border/80 rounded-2xl p-4 mx-2 shadow-lg transition-all duration-200 ease-in-out origin-top ${
          isMobileMenuOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
            className="w-full text-left rounded-xl px-4 py-2 hover:bg-black/5 text-sm text-muted hover:text-ink transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
            className="w-full text-left rounded-xl px-4 py-2 hover:bg-black/5 text-sm text-muted hover:text-ink transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
            className="w-full text-left rounded-xl px-4 py-2 hover:bg-black/5 text-sm text-muted hover:text-ink transition-colors"
          >
            How it works
          </button>

          <div className="border-t border-border/50 mt-2 pt-2">
            {!user ? (
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-brand-primary font-medium text-sm px-4 py-2 border border-brand-soft rounded-lg bg-brand-tint hover:bg-brand-soft/20 transition-colors w-full"
              >
                Login / Sign up
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="w-7 h-7 rounded-full bg-brand-tint text-brand-primary flex items-center justify-center text-xs font-semibold border border-brand-soft">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-ink truncate">{user?.email}</span>
                </div>
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rounded-xl px-4 py-2 hover:bg-black/5 text-sm text-risk-high font-medium flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
