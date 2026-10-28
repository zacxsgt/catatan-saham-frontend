export default function Card({ children, className = '', padding = 'p-4', ...props }) {
  return (
    <div
      className={`bg-surface border border-line rounded-2xl ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}