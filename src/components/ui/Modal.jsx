import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-[fadeIn_.2s_ease]" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-surface border border-line rounded-2xl p-5 animate-[modalIn_.25s_cubic-bezier(.2,.8,.2,1)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Tutup" className="text-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}