import OpenAI from 'openai'
import { AIService, NoteAnalysis, ServiceStatus, AIServiceConfig } from './types'
import { DEFAULT_TIMEOUT, DEFAULT_MAX_RETRIES } from './constants'
import { validateApiKey, withRetry, withTimeout, handleApiError } from './utils'

export class OpenAIService implements AIService {
  private client: OpenAI
  private config: AIServiceConfig
  private lastError?: string

  constructor(config: AIServiceConfig) {
    this.config = config
    
    try {
      validateApiKey(config.apiKey)
      
      this.client = new OpenAI({
        apiKey: config.apiKey,
        baseURL: config.baseURL,
        timeout: config.timeout || DEFAULT_TIMEOUT,
        maxRetries: config.maxRetries || DEFAULT_MAX_RETRIES
      })
    } catch (error) {
      this.lastError = (error as Error).message
      throw error
    }
  }

  async generateResponse(prompt: string, context?: string): Promise<string> {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant that helps users with note-taking, organization, and knowledge management. Provide clear, concise, and helpful responses.'
      }
    ]

    if (context) {
      messages.push({
        role: 'system',
        content: `Context from user's notes: ${context}`
      })
    }

    messages.push({
      role: 'user',
      content: prompt
    })

    try {
      const response = await withRetry(
        () => withTimeout(
          this.client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 500,
            temperature: 0.7
          }),
          this.config.timeout || DEFAULT_TIMEOUT
        ),
        this.config.maxRetries || DEFAULT_MAX_RETRIES
      )

      return response.choices[0]?.message?.content || 'No response generated'
    } catch (error) {
      this.lastError = (error as Error).message
      return handleApiError(error)
    }
  }

  async analyzeNote(noteContent: string): Promise<NoteAnalysis> {
    const prompt = `Analyze the following note and provide:
1. A brief summary
2. 3-5 key points 
3. Suggested tags (comma-separated)
4. Sentiment analysis (positive/negative/neutral)

Note content: ${noteContent.substring(0, 2000)}`

    try {
      const response = await withRetry(
        () => withTimeout(
          this.client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are an expert at analyzing notes. Provide structured analysis with summary, key points, tags, and sentiment.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 300,
            temperature: 0.3
          }),
          this.config.timeout || DEFAULT_TIMEOUT
        ),
        this.config.maxRetries || DEFAULT_MAX_RETRIES
      )

      const content = response.choices[0]?.message?.content || ''
      return this.parseAnalysisResponse(content)
    } catch (error) {
      this.lastError = (error as Error).message
      return handleApiError(error)
    }
  }

  async summarizeText(text: string): Promise<string> {
    try {
      const response = await withRetry(
        () => withTimeout(
          this.client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are an expert at summarizing text. Provide concise, accurate summaries that capture the main points.'
              },
              {
                role: 'user',
                content: `Please summarize the following text: ${text.substring(0, 3000)}`
              }
            ],
            max_tokens: 200,
            temperature: 0.4
          }),
          this.config.timeout || DEFAULT_TIMEOUT
        ),
        this.config.maxRetries || DEFAULT_MAX_RETRIES
      )

      return response.choices[0]?.message?.content || 'Unable to generate summary'
    } catch (error) {
      this.lastError = (error as Error).message
      return handleApiError(error)
    }
  }

  getServiceStatus(): ServiceStatus {
    return {
      available: !!this.client && !this.lastError,
      lastError: this.lastError
    }
  }

  private parseAnalysisResponse(response: string): NoteAnalysis {
    // Simple parsing logic - in real implementation, you might use more sophisticated parsing
    const lines = response.split('\n').filter(line => line.trim())
    
    const summary = lines.find(line => line.toLowerCase().includes('summary')) || 
                   lines[0] || 
                   'Summary not available'
    
    const keyPoints = lines
      .filter(line => line.match(/^\d+[\\.\-]/) || line.toLowerCase().includes('key point'))
      .slice(0, 5)
    
    const tagLine = lines.find(line => line.toLowerCase().includes('tag'))
    const suggestedTags = tagLine 
      ? tagLine.replace(/[^a-zA-Z,\s]/g, '').split(',').map(tag => tag.trim()).filter(Boolean)
      : ['general']
    
    const sentimentLine = lines.find(line => line.toLowerCase().includes('sentiment'))
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    if (sentimentLine) {
      if (sentimentLine.toLowerCase().includes('positive')) sentiment = 'positive'
      if (sentimentLine.toLowerCase().includes('negative')) sentiment = 'negative'
    }

    return {
      summary: summary.replace(/^summary[\s:\-]*/i, '').trim(),
      keyPoints: keyPoints.length > 0 ? keyPoints : ['No key points identified'],
      suggestedTags,
      sentiment
    }
  }
}