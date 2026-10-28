import PortfolioSummaryCard from '../features/home/PortfolioSummaryCard'
import QuickActions from '../features/home/QuickActions'
import RecentTransactionsList from '../features/home/RecentTransactionsList'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'

export default function HomeRoute() {
  const { user } = useAuth()
  const { data: profile } = useProfile()
  const name = profile?.full_name || user?.email?.split('@')[0] || ''

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="font-heading text-xl md:text-2xl font-semibold text-ink">Halo, {name}</h1>
        <p className="text-sm text-muted">Kelola portofolio Anda hari ini</p>
      </div>
      <PortfolioSummaryCard />
      <QuickActions />
      <RecentTransactionsList />
    </div>
  )
}