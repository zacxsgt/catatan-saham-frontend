import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../api/supabaseClient'
import { signInWithEmail, signOutUser } from '../api/authApi'
import { verifyPin as verifyPinRequest } from '../api/pinApi'

const AuthContext = createContext(null)
const UNLOCKED_KEY = 'pinUnlocked'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unlocked, setUnlockedState] = useState(
    () => sessionStorage.getItem(UNLOCKED_KEY) === '1'
  )

  const setUnlocked = useCallback((value) => {
    setUnlockedState(value)
    if (value) {
      sessionStorage.setItem(UNLOCKED_KEY, '1')
    } else {
      sessionStorage.removeItem(UNLOCKED_KEY)
    }
  }, [])

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession)
      if (event === 'SIGNED_OUT') setUnlocked(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [setUnlocked])

  const signIn = useCallback(async (email, password) => {
    setUnlocked(true)
    try {
      await signInWithEmail(email, password)
    } catch (err) {
      setUnlocked(false)
      throw err
    }
  }, [setUnlocked])

  const verifyPin = useCallback(async (pin) => {
    await verifyPinRequest(pin)
    setUnlocked(true)
  }, [setUnlocked])

  const lock = useCallback(() => setUnlocked(false), [setUnlocked])

  const signOut = useCallback(async () => {
    await signOutUser()
    setUnlocked(false)
  }, [setUnlocked])

  const value = useMemo(() => {
    let status = 'ready'
    if (loading) status = 'loading'
    else if (!session) status = 'signedOut'
    else if (!unlocked) status = 'locked'

    return {
      status,
      session,
      user: session?.user ?? null,
      signIn,
      verifyPin,
      lock,
      signOut,
    }
  }, [loading, session, unlocked, signIn, verifyPin, lock, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider')
  }
  return context
}