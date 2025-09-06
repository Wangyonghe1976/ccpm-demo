export interface AIService {
  generateResponse(prompt: string, context?: string): Promise<string>
  analyzeNote(noteContent: string): Promise<NoteAnalysis>
  summarizeText(text: string): Promise<string>
  getServiceStatus(): ServiceStatus
}

export interface NoteAnalysis {
  summary: string
  keyPoints: string[]
  suggestedTags: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
}

export interface ServiceStatus {
  available: boolean
  rateLimit?: RateLimitInfo
  lastError?: string
}

export interface RateLimitInfo {
  remaining: number
  limit: number
  resetAt?: Date
}

export interface AIServiceConfig {
  provider: 'openai' | 'mock'
  apiKey?: string
  baseURL?: string
  timeout?: number
  maxRetries?: number
}

export interface AIError {
  type: 'network' | 'api' | 'validation' | 'rate_limit' | 'timeout'
  message: string
  retryable: boolean
  statusCode?: number
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}