import { apiRequest } from './client'

export const getProfile = () => apiRequest('/api/profile')
export const updateProfile = (payload) => apiRequest('/api/profile', { method: 'PUT', body: payload })