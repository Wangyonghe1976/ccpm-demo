import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Sidebar } from './components/layout/Sidebar'
import { Main } from './components/layout/Main'
import { Card } from './components/ui/Card'
import { Button } from './components/ui/Button'
import { useNoteStore } from './stores/useNoteStore'
import { useAIAssistantStore } from './stores/useAIAssistantStore'

function App() {
  const { notes, addNote, toggleSidebar, isSidebarOpen } = useNoteStore()
  const { isActive, activateAssistant, deactivateAssistant } = useAIAssistantStore()

  const handleAddNote = () => {
    addNote('', 'New Note')
  }

  const handleToggleAssistant = () => {
    if (isActive) {
      deactivateAssistant()
    } else {
      activateAssistant()
    }
  }

  return (
    <div className="app">
      <Header 
        title="AI Assistant Notes" 
        onMenuClick={toggleSidebar}
      />
      
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <div style={{ padding: '1rem' }}>
          <h3>Notes ({notes.length})</h3>
          <Button onClick={handleAddNote} variant="primary" size="small">
            + New Note
          </Button>
          <Button 
            onClick={handleToggleAssistant} 
            variant={isActive ? 'secondary' : 'primary'} 
            size="small"
            style={{ marginTop: '0.5rem' }}
          >
            {isActive ? 'Deactivate AI' : 'Activate AI'}
          </Button>
        </div>
      </Sidebar>

      <Main>
        <Card title="Welcome to AI Assistant Notes">
          <p>This is your note-taking application with AI assistant integration.</p>
          <p>Features:</p>
          <ul>
            <li>Create and manage notes</li>
            <li>AI assistant integration</li>
            <li>Persistent state management</li>
            <li>Responsive design</li>
          </ul>
          <Button onClick={handleAddNote} variant="primary">
            Create Your First Note
          </Button>
        </Card>

        {notes.length > 0 && (
          <Card title="Your Notes" className="mt-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notes.map((note) => (
                <Card key={note.id} title={note.title}>
                  <p>{note.content || 'No content yet...'}</p>
                  <small>Created: {note.createdAt.toLocaleDateString()}</small>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </Main>

      <Footer version="1.0.0" />
    </div>
  )
}

export default App