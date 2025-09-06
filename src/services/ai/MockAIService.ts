import { AIService, NoteAnalysis, ServiceStatus, AIServiceConfig } from './types'
import { MOCK_RESPONSES } from './constants'
import { delay } from './utils'

export class MockAIService implements AIService {
  private lastError?: string

  constructor(_config: AIServiceConfig) {
    // Config parameter is accepted for interface compatibility
  }

  async generateResponse(prompt: string): Promise<string> {
    await delay(500 + Math.random() * 1000) // Simulate network delay
    
    if (Math.random() < 0.1) {
      // 10% chance of error for testing
      this.lastError = 'Mock service error for testing'
      throw new Error(this.lastError)
    }

    const responses = [
      MOCK_RESPONSES.GREETING,
      MOCK_RESPONSES.ANALYSIS,
      MOCK_RESPONSES.SUMMARY,
      `I understand you're asking about: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`,
      'Based on the context provided, I can help you organize your thoughts and ideas.',
      'Would you like me to help summarize or analyze this content further?'
    ]

    return responses[Math.floor(Math.random() * responses.length)] || MOCK_RESPONSES.GREETING
  }

  async analyzeNote(noteContent: string): Promise<NoteAnalysis> {
    await delay(800 + Math.random() * 1200)

    const sentiments: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral']
    const tags = ['productivity', 'ideas', 'research', 'personal', 'work', 'learning']
    
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)] || 'neutral'
    
    return {
      summary: `This note contains ${Math.ceil(noteContent.length / 50)} key ideas about various topics.`,
      keyPoints: [
        'Main theme: Organization and productivity',
        'Secondary theme: Knowledge management',
        'Suggested action: Review and categorize'
      ],
      suggestedTags: tags.slice(0, 2 + Math.floor(Math.random() * 3)),
      sentiment
    }
  }

  async summarizeText(text: string): Promise<string> {
    await delay(600 + Math.random() * 900)

    // const summaryLength = Math.max(50, Math.min(200, Math.floor(text.length / 10)))
    return `This text discusses ${Math.ceil(text.length / 100)} main points about an important topic. The key ideas include fundamental concepts and practical applications that are relevant to the subject matter.`
  }

  getServiceStatus(): ServiceStatus {
    return {
      available: true,
      lastError: this.lastError || undefined
    }
  }
}