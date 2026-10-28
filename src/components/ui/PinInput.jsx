import { useRef, useState } from 'react'

export default function PinInput({ length = 6, onComplete, disabled = false, error = false }) {
  const [digits, setDigits] = useState(() => Array(length).fill(''))
  const inputsRef = useRef([])

  function commit(next) {
    setDigits(next)
    if (next.every((d) => d !== '')) onComplete?.(next.join(''))
  }

  function handleChange(index, e) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    commit(next)
    if (digit && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const next = [...digits]
      next[index - 1] = ''
      setDigits(next)
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) inputsRef.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < length - 1) inputsRef.current[index + 1]?.focus()
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array(length).fill('')
    pasted.split('').forEach((ch, i) => {
      next[i] = ch
    })
    commit(next)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="flex justify-center gap-2.5">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={1}
          autoFocus={index === 0}
          disabled={disabled}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          aria-label={`Digit PIN ke-${index + 1}`}
          className={`w-11 h-12 text-center text-lg font-heading font-semibold bg-surface border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 disabled:opacity-50 ${
            error ? 'border-loss' : 'border-line'
          }`}
        />
      ))}
    </div>
  )
}