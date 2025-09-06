export interface Note {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  title?: string
}

export interface AIAssistantState {
  isActive: boolean
  currentResponse: string
  isLoading: boolean
  error: string | null
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
}

export interface AppState {
  notes: Note[]
  currentNoteId: string | null
  searchQuery: string
  filterTags: string[]
  viewMode: 'list' | 'grid'
  isSidebarOpen: boolean
}

export interface NoteStore extends AppState {
  addNote: (content: string, title?: string) => void
  updateNote: (id: string, content: string) => void
  deleteNote: (id: string) => void
  setCurrentNote: (id: string | null) => void
  setSearchQuery: (query: string) => void
  setFilterTags: (tags: string[]) => void
  setViewMode: (mode: 'list' | 'grid') => void
  toggleSidebar: () => void
}

export interface AIAssistantStore extends AIAssistantState {
  activateAssistant: () => void
  deactivateAssistant: () => void
  setResponse: (response: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addToHistory: (role: 'user' | 'assistant', content: string) => void
  clearHistory: () => void
}