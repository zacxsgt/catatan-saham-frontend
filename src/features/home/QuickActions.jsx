import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react'
import Card from '../../components/ui/Card'

const ACTIONS = [
  { to: '/trade/buy', label: 'Beli', icon: ArrowUpRight },
  { to: '/trade/sell', label: 'Jual', icon: ArrowDownLeft },
  { to: '/trade/check', label: 'Cek Saham', icon: Search },
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {ACTIONS.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to}>
          <Card className="flex flex-col items-center gap-2 py-4 hover:bg-canvas">
            <div className="w-9 h-9 rounded-xl bg-canvas flex items-center justify-center text-ink">
              <Icon size={17} />
            </div>
            <span className="text-xs font-medium text-ink">{label}</span>
          </Card>
        </Link>
      ))}
    </div>
  )
}