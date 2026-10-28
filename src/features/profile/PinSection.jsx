import { useState } from 'react'
import { ChevronRight, KeyRound } from 'lucide-react'
import Card from '../../components/ui/Card'
import PinInput from '../../components/ui/PinInput'
import { setPin } from '../../api/pinApi'

export default function PinSection() {
  const [expanded, setExpanded] = useState(false)
  const [pinKey, setPinKey] = useState(0)
  const [status, setStatus] = useState('')

  async function handleComplete(pin) {
    setStatus('saving')
    try {
      await setPin(pin)
      setStatus('success')
    } catch (err) {
      setStatus(err.message)
    } finally {
      setPinKey((k) => k + 1)
    }
  }

  return (
    <Card>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between"
      >
        <span className="flex items-center gap-2 text-sm text-ink">
          <KeyRound size={16} />
          Ganti PIN
        </span>
        <ChevronRight size={16} className={`text-muted transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {expanded && (
        <div className="slide-down flex flex-col items-center gap-3 mt-4 pt-4 border-t border-line">
          <p className="text-sm text-muted text-center">Masukkan PIN baru (6 digit)</p>
          <PinInput key={pinKey} onComplete={handleComplete} disabled={status === 'saving'} />
          {status === 'success' && <p className="text-xs text-profit">PIN berhasil diperbarui</p>}
          {status && status !== 'saving' && status !== 'success' && (
            <p className="text-xs text-loss">{status}</p>
          )}
        </div>
      )}
    </Card>
  )
}