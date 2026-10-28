import { useEffect, useRef, useState } from 'react'
import PinInput from '../../components/ui/PinInput'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from './AuthLayout'

const RESET_MS = 600

export default function PinLoginForm() {
  const { user, verifyPin, signOut } = useAuth()
  const [pinKey, setPinKey] = useState(0)
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const resetTimer = useRef(null)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function handleComplete(pin) {
    setBusy(true)
    setMessage('')
    try {
      await verifyPin(pin)
      // Berhasil: AuthContext membuka kunci dan layar ini otomatis diganti.
    } catch (err) {
      setError(true)
      // Pesan dari backend kurang jelas untuk akun yang belum pernah mengatur PIN.
      setMessage(
        err.message === 'PIN belum diatur'
          ? 'PIN belum diatur. Masuk dengan password, lalu atur PIN di menu Profil.'
          : err.message
      )
      // Kotak PIN dikosongkan setelah jeda singkat; input tetap terkunci selama itu.
      resetTimer.current = setTimeout(() => {
        setError(false)
        setBusy(false)
        setPinKey((k) => k + 1)
      }, RESET_MS)
    }
  }

  async function handleSwitchAccount() {
    try {
      await signOut()
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <AuthLayout title="Masukkan PIN" subtitle={user?.email}>
      <div className="flex flex-col gap-4">
        <div className={error ? 'shake' : ''}>
          <PinInput key={pinKey} onComplete={handleComplete} error={error} disabled={busy} />
        </div>
        <p
          role="status"
          className={`min-h-5 text-center text-sm ${message ? 'text-loss' : 'text-muted'}`}
        >
          {message || (busy ? 'Memeriksa PIN...' : '')}
        </p>
        <Button variant="ghost" onClick={handleSwitchAccount}>
          Lupa PIN? Masuk dengan password
        </Button>
      </div>
    </AuthLayout>
  )
}