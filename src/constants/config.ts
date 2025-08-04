export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3033' : '',
  DEFAULT_MODEL: 'llama3.2-3b',
  ENDPOINTS: {
    ANALYZE: '/api/analyze',
    MODELS: '/api/models',
    HEALTH: '/health'
  }
} as const;

export const UI_CONFIG = {
  ERROR_DISPLAY_DURATION: 5000
} as const;