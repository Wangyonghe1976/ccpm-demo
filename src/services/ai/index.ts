import { AIService, AIServiceConfig } from './types'
import { OpenAIService } from './OpenAIService'
import { MockAIService } from './MockAIService'

export function createAIService(config: AIServiceConfig): AIService {
  switch (config.provider) {
    case 'openai':
      return new OpenAIService(config)
    case 'mock':
      return new MockAIService(config)
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`)
  }
}

export type { AIService, AIServiceConfig, NoteAnalysis, ServiceStatus } from './types'
export { OpenAIService, MockAIService }