import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { NoteStore, Note } from './types'

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],
      currentNoteId: null,
      searchQuery: '',
      filterTags: [],
      viewMode: 'list',
      isSidebarOpen: false,

      addNote: (content: string, title?: string) => {
        const newNote: Note = {
          id: Date.now().toString(),
          content,
          title: title || `Note ${get().notes.length + 1}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: [],
        }
        
        set((state) => ({
          notes: [newNote, ...state.notes],
          currentNoteId: newNote.id,
        }))
      },

      updateNote: (id: string, content: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, content, updatedAt: new Date() }
              : note
          ),
        }))
      },

      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          currentNoteId: state.currentNoteId === id ? null : state.currentNoteId,
        }))
      },

      setCurrentNote: (id: string | null) => {
        set({ currentNoteId: id })
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query })
      },

      setFilterTags: (tags: string[]) => {
        set({ filterTags: tags })
      },

      setViewMode: (mode: 'list' | 'grid') => {
        set({ viewMode: mode })
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
      },
    }),
    {
      name: 'note-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notes: state.notes,
        currentNoteId: state.currentNoteId,
        viewMode: state.viewMode,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
)