import { TrendingUp, TrendingDown } from 'lucide-react'
import Card from '../../components/ui/Card'
import MiniSparkline from '../../components/charts/MiniSparkline'
import { usePortfolio } from '../../hooks/usePortfolio'
import { formatRupiah } from '../../utils/formatCurrency'

export default function PortfolioSummaryCard() {
  const { data, isLoading, isError, error, refetch } = usePortfolio()

  if (isLoading) {
    return (
      <Card padding="p-4 md:p-6" className="animate-pulse">
        <div className="h-3 w-24 bg-line rounded mb-3" />
        <div className="h-9 w-48 bg-line rounded" />
      </Card>
    )
  }

  if (isError) {
    return (
      <Card padding="p-4 md:p-6">
        <p className="text-sm text-loss mb-2">{error.message}</p>
        <button onClick={() => refetch()} className="text-sm text-ink underline">
          Coba lagi
        </button>
      </Card>
    )
  }

  const { total_current_value, total_unrealized_gain_loss, total_unrealized_gain_loss_percent } = data.summary
  const isProfit = total_unrealized_gain_loss >= 0
  const hasHoldings = data.holdings.length > 0

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Card padding="p-4 md:p-6" className="flex-[1.3]">
        <p className="text-xs md:text-sm text-muted mb-1">Total investasi</p>
        <p className="font-heading text-2xl md:text-4xl font-semibold text-ink whitespace-nowrap">
          {formatRupiah(total_current_value)}
        </p>
        <p className={`flex items-center gap-1 text-sm md:text-base font-medium mt-2 ${isProfit ? 'text-profit' : 'text-loss'}`}>
          {isProfit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {isProfit ? '+' : ''}
          {formatRupiah(total_unrealized_gain_loss)} ({total_unrealized_gain_loss_percent}%)
        </p>
      </Card>

      <Card padding="p-4 md:p-6" className="flex-1">
        {hasHoldings ? (
          <MiniSparkline />
        ) : (
          <p className="text-sm text-muted">Grafik akan muncul setelah ada transaksi</p>
        )}
      </Card>
    </div>
  )
}