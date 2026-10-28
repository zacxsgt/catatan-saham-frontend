import Input from './Input'

const MAX_DIGITS = 13 // batas backend: maksimal Rp 1 triliun

function formatThousands(raw) {
  if (!raw) return ''
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// `value` = angka mentah (string digit, tanpa titik). `onChange` menerima angka mentah juga.
export default function ThousandInput({ value, onChange, ...props }) {
  return (
    <Input
      inputMode="numeric"
      value={formatThousands(value)}
      onChange={(e) => {
        const raw = e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, MAX_DIGITS)
        onChange(raw)
      }}
      {...props}
    />
  )
}