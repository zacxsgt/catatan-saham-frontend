import { NavLink } from 'react-router-dom'
import { Home, BarChart3, Calendar, Clock, User } from 'lucide-react'

const ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/analysis', label: 'Analisis', icon: BarChart3 },
  { to: '/schedule', label: 'Jadwal', icon: Calendar },
  { to: '/history', label: 'Riwayat', icon: Clock },
  { to: '/profile', label: 'Profil', icon: User },
]

const RAISED_PATH = '/schedule'

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-line">
      <ul className="flex items-end justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const raised = to === RAISED_PATH
          return (
            <li key={to} className={`flex-1 ${raised ? 'flex flex-col items-center -mt-7' : ''}`}>
              <NavLink to={to} aria-label={raised ? label : undefined}>
                {({ isActive }) =>
                  raised ? (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-canvas shadow-lg bg-ink text-canvas">
                        <Icon size={24} />
                      </div>
                      <span className={`text-[11px] mt-1 ${isActive ? 'text-ink font-medium' : 'text-muted'}`}>
                        {label}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`w-full flex flex-col items-center gap-1 py-1.5 text-[11px] ${
                        isActive ? 'text-ink font-medium' : 'text-muted'
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </div>
                  )
                }
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}