import { apiRequest } from './client'

export const getPortfolio = () => apiRequest('/api/transactions/portfolio')

export function getTransactions(symbol) {
  const query = symbol ? `?symbol=${encodeURIComponent(symbol)}` : ''
  return apiRequest(`/api/transactions${query}`)
}

export const createTransaction = (payload) =>
  apiRequest('/api/transactions', { method: 'POST', body: payload })