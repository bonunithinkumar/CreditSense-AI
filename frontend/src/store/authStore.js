import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('access_token') || null,
  login: (token, user) => {
    localStorage.setItem('access_token', token)
    set({ token, user })
  },
  logout: () => {
    localStorage.removeItem('access_token')
    set({ token: null, user: null })
  },
}))

export default useAuthStore
