import { useState } from 'react'
import SplashScreen from './features/splash/SplashScreen'
import LoginForm from './features/auth/LoginForm'
import PinLoginForm from './features/auth/PinLoginForm'
import AppRouter from './routes/AppRouter'
import { useAuth } from './context/AuthContext'

const SPLASH_SEEN_KEY = 'splashSeen'

function App() {
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem(SPLASH_SEEN_KEY)
  )
  const { status } = useAuth()

  function handleSplashFinish() {
    sessionStorage.setItem(SPLASH_SEEN_KEY, '1')
    setShowSplash(false)
  }

  let content
  if (status === 'loading') {
    content = (
      <div className="min-h-dvh bg-canvas flex items-center justify-center">
        <p className="text-sm text-muted">Memuat...</p>
      </div>
    )
  } else if (status === 'signedOut') {
    content = <LoginForm />
  } else if (status === 'locked') {
    content = <PinLoginForm />
  } else {
    content = <AppRouter />
  }

  return (
    <>
      {content}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
    </>
  )
}

export default App