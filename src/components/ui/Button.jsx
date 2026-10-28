const VARIANTS = {
  primary: 'bg-ink text-canvas hover:opacity-90',
  secondary: 'bg-surface text-ink border border-line hover:bg-canvas',
  ghost: 'bg-transparent text-muted hover:text-ink',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}