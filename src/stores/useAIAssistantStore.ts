import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AIAssistantStore } from './types'

export const useAIAssistantStore = create<AIAssistantStore>()(
  persist(
    (set) => ({
      isActive: false,
      currentResponse: '',
      isLoading: false,
      error: null,
      conversationHistory: [],

      activateAssistant: () => {
        set({ isActive: true, error: null })
      },

      deactivateAssistant: () => {
        set({ isActive: false })
      },

      setResponse: (response: string) => {
        set({ currentResponse: response })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      addToHistory: (role: 'user' | 'assistant', content: string) => {
        const newEntry = {
          role,
          content,
          timestamp: new Date(),
        }
        
        set((state) => ({
          conversationHistory: [...state.conversationHistory, newEntry],
        }))
      },

      clearHistory: () => {
        set({ conversationHistory: [] })
      },
    }),
    {
      name: 'ai-assistant-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversationHistory: state.conversationHistory,
      }),
    }
  )
)