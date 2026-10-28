import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from './AuthLayout'

export default function LoginForm() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <AuthLayout title="Masuk" subtitle="Gunakan akun yang sudah terdaftar">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              className="p-2 rounded-lg text-muted hover:text-ink"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        {error && (
          <p role="alert" className="text-sm text-loss text-center">
            {error}
          </p>
        )}
        <Button type="submit" disabled={busy || !email || !password} className="mt-1">
          {busy ? 'Masuk...' : 'Masuk'}
        </Button>
      </form>
    </AuthLayout>
  )
}