import { apiRequest } from './client'

export const getCachedPrice = (symbol) => apiRequest(`/api/stocks/price/${symbol}`)

export const analyzeStock = (symbol, budget) =>
  apiRequest('/api/stocks/analyze', { method: 'POST', body: { symbol, budget } })