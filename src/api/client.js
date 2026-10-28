import { supabase } from './supabaseClient'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

if (!BASE_URL) {
  throw new Error('VITE_API_BASE_URL belum diisi di file .env')
}

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) throw new ApiError('Sesi berakhir. Silakan masuk kembali.', 401)
    headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Tidak dapat terhubung ke server. Periksa koneksi Anda.')
  }

  let payload = null
  try {
    payload = await res.json()
  } catch {
    // respons bukan JSON, ditangani di bawah
  }

  if (!res.ok || !payload?.success) {
    throw new ApiError(payload?.error || 'Server tidak merespons dengan benar.', res.status)
  }

  return payload.data ?? payload
}