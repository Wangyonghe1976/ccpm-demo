import { StateStorage } from 'zustand/middleware'

export const createStorage = (): StateStorage => ({
  getItem: (name: string): string | null => {
    try {
      return localStorage.getItem(name)
    } catch (error) {
      console.warn('LocalStorage not available:', error)
      return null
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      localStorage.setItem(name, value)
    } catch (error) {
      console.warn('LocalStorage not available:', error)
    }
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name)
    } catch (error) {
      console.warn('LocalStorage not available:', error)
    }
  },
})

export const storage = createStorage()