import { create } from 'zustand'

// Decode user from the JWT already stored in localStorage
function restoreUser() {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    // If token is expired, clear it
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('access_token')
      return null
    }
    return { email: payload.sub, user_id: payload.user_id }
  } catch {
    return null
  }
}

const useAuthStore = create((set) => ({
  user: restoreUser(),
  token: localStorage.getItem('access_token') || null,
  login: (token, user) => {
    localStorage.setItem('access_token', token)
    const resolvedUser = user ?? restoreUser()
    set({ token, user: resolvedUser })
  },
  logout: () => {
    localStorage.removeItem('access_token')
    set({ token: null, user: null })
  },
}))

export default useAuthStore
