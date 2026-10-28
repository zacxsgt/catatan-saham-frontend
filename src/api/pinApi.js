import { apiRequest } from './client'

export const verifyPin = (pin) =>
  apiRequest('/api/pin/verify', { method: 'POST', body: { pin } })

export const setPin = (pin) =>
  apiRequest('/api/pin/set', { method: 'POST', body: { pin } })