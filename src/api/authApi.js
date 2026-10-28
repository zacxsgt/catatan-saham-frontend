import { supabase } from './supabaseClient'

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error('[AUTH]', error.message)
    throw new Error(
      error.message === 'Invalid login credentials'
        ? 'Email atau password salah'
        : 'Gagal masuk. Coba lagi sebentar lagi.'
    )
  }
  return data
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error('Gagal keluar. Coba lagi.')
}