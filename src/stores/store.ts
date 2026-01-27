import { create } from 'zustand'

// Counter store (kept for compatibility)
export interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// User/profile store
export interface UserProfile {
  name: string
  employeeId: string
  department: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  mobile: string
}

export interface UserState {
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  clearUser: () => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: 'Zyle Adam Doctolero',
    employeeId: '000001',
    department: 'Master Data',
    firstName: 'Zyle',
    middleName: 'Adam',
    lastName: 'Doctolero',
    email: 'zyle.doctolero@example.com',
    mobile: '+63 912 345 6789',
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  theme: (typeof window !== 'undefined' && (localStorage.getItem('theme') as 'light' | 'dark')) || 'light',
  toggleTheme: () => set((s) => {
    const next = s.theme === 'light' ? 'dark' : 'light'
    if (typeof window !== 'undefined') localStorage.setItem('theme', next)
    return { theme: next }
  }),
}))

export default useCounterStore