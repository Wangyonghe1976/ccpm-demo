import { AIError as AIErrorType } from './types'

export class AIError extends Error implements AIErrorType {
  constructor(
    public type: 'network' | 'api' | 'validation' | 'rate_limit' | 'timeout',
    message: string,
    public retryable: boolean = false,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'AIError'
  }
}

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> => {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries || !(error instanceof AIError) || !error.retryable) {
        throw error
      }
      
      const delayMs = initialDelay * Math.pow(2, attempt - 1)
      await delay(delayMs)
    }
  }
  
  throw lastError!
}

export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> => {
  return Promise.race([
    promise,
    delay(timeoutMs).then(() => {
      throw new AIError('timeout', 'Request timed out', true)
    })
  ])
}

export const validateApiKey = (apiKey?: string): void => {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    throw new AIError('validation', 'API key is required', false)
  }
  
  if (!apiKey.startsWith('sk-')) {
    throw new AIError('validation', 'Invalid API key format', false)
  }
}

export const handleApiError = (error: any): never => {
  if (error.response?.status === 429) {
    throw new AIError('rate_limit', 'Rate limit exceeded', true, 429)
  }
  
  if (error.response?.status >= 500) {
    throw new AIError('api', 'Server error', true, error.response.status)
  }
  
  if (error.response?.status >= 400) {
    throw new AIError('api', `API error: ${error.response.data?.error?.message || error.message}`, false, error.response.status)
  }
  
  if (error.code === 'ECONNABORTED') {
    throw new AIError('timeout', 'Request timeout', true)
  }
  
  if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
    throw new AIError('network', 'Network error', true)
  }
  
  throw new AIError('api', `Unexpected error: ${error.message}`, false)
}