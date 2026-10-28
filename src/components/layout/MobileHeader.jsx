import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProfile } from '../../hooks/useProfile'
import LogoMark from '../ui/LogoMark'

export default function MobileHeader() {
  const { user } = useAuth()
  const { data: profile } = useProfile()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || ''
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className="md:hidden sticky top-0 z-30">
      <div
        className="relative px-4 py-3 flex items-center justify-between rounded-b-2xl backdrop-blur-md shadow-[0_6px_16px_-6px_rgba(0,0,0,0.3)]"
        style={{
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-canvas) 140%)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <LogoMark size={26} />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-profit border-2 border-surface" />
          </div>
          <span className="font-heading font-semibold text-sm text-ink">Catatan Saham</span>
        </div>

        <Link
          to="/profile"
          className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shrink-0 ring-2 ring-profit/40 active:scale-90 transition-transform duration-150"
        >
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="w-full h-full flex items-center justify-center bg-canvas text-xs font-heading text-ink">
              {initial}
            </span>
          )}
        </Link>

        <div
          className="absolute -bottom-px inset-x-6 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-line), transparent)' }}
        />
      </div>
    </header>
  )
}