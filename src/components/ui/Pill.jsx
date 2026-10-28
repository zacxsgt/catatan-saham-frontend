export default function Pill({
  active = false,
  children,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? 'bg-ink text-canvas border-ink font-medium'
          : 'bg-transparent text-muted border-line hover:text-ink'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}