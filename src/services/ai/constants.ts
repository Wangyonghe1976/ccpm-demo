export const DEFAULT_TIMEOUT = 30000 // 30 seconds
export const DEFAULT_MAX_RETRIES = 3
export const DEFAULT_BACKOFF_FACTOR = 2
export const INITIAL_RETRY_DELAY = 1000 // 1 second

export const RATE_LIMIT_HEADERS = {
  REMAINING: 'x-ratelimit-remaining',
  LIMIT: 'x-ratelimit-limit',
  RESET: 'x-ratelimit-reset'
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  TIMEOUT: 'TIMEOUT',
  VALIDATION: 'VALIDATION'
}

export const OPENAI_ENDPOINTS = {
  CHAT_COMPLETIONS: 'https://api.openai.com/v1/chat/completions'
}

export const MOCK_RESPONSES = {
  GREETING: 'Hello! How can I assist you with your notes today?',
  ANALYSIS: 'This note appears to be about productivity and organization. Key points include task management and prioritization.',
  SUMMARY: 'This text discusses the importance of effective note-taking strategies for knowledge management.',
  ERROR: 'I apologize, but I encountered an issue processing your request. Please try again.'
}