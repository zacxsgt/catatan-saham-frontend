import { NavLink } from 'react-router-dom'
import { Home, BarChart3, Calendar, Clock, User, LogOut } from 'lucide-react'
import LogoMark from '../ui/LogoMark'
import { useAuth } from '../../context/AuthContext'
import { useProfile } from '../../hooks/useProfile'

const ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/analysis', label: 'Analisis', icon: BarChart3 },
  { to: '/schedule', label: 'Jadwal', icon: Calendar },
  { to: '/history', label: 'Riwayat', icon: Clock },
  { to: '/profile', label: 'Profil', icon: User },
]

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const { data: profile } = useProfile()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || ''
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-dvh sticky top-0 bg-surface border-r border-line px-4 py-6">
      <div className="flex items-center gap-2.5 px-2 mb-10">
        <LogoMark size={38} />
        <span className="font-heading font-semibold text-lg text-ink">Catatan Saham</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left ${
                isActive ? 'bg-canvas text-ink font-medium' : 'text-muted hover:text-ink'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line pt-3 mt-3">
        <div className="flex items-center gap-2.5 px-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-canvas border border-line overflow-hidden flex items-center justify-center shrink-0">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-heading text-ink">{initial}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">{displayName}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut().catch(() => {})}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-loss"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  )
}