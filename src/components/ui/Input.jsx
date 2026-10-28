export default function Input({ label, error, hint, endAdornment, className = '', id, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm text-muted mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={`w-full bg-surface border rounded-xl px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink/20 ${
            endAdornment ? 'pr-11' : ''
          } ${error ? 'border-loss' : 'border-line'} ${className}`}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-1.5 flex items-center">{endAdornment}</div>
        )}
      </div>
      {error ? (
        <p className="text-loss text-xs mt-1">{error}</p>
      ) : hint ? (
        <p className="text-muted text-xs mt-1">{hint}</p>
      ) : null}
    </div>
  )
}