import LogoMark from '../../components/ui/LogoMark'
import Card from '../../components/ui/Card'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-dvh bg-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        <LogoMark size={110} className="-my-4" />
        <h1 className="font-heading text-2xl font-semibold text-ink mt-4">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-1 text-center">{subtitle}</p>}
        <Card className="w-full mt-8">{children}</Card>
      </div>
    </div>
  )
}