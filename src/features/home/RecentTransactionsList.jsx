import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import Card from '../../components/ui/Card'
import { useRecentTransactions } from '../../hooks/usePortfolio'
import { formatRupiah } from '../../utils/formatCurrency'
import { formatDateID } from '../../utils/formatDate'

export default function RecentTransactionsList() {
  const { data, isLoading, isError, error, refetch } = useRecentTransactions(5)

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading text-sm font-semibold text-ink">Transaksi terbaru</h2>
        <Link to="/history" className="text-xs text-muted hover:text-ink">
          Lihat semua
        </Link>
      </div>

      <Card className="p-0 px-4 divide-y divide-line">
        {isLoading && <p className="text-sm text-muted py-4">Memuat...</p>}

        {isError && (
          <div className="py-4">
            <p className="text-sm text-loss mb-2">{error.message}</p>
            <button onClick={() => refetch()} className="text-sm text-ink underline">
              Coba lagi
            </button>
          </div>
        )}

        {data?.length === 0 && (
          <p className="text-sm text-muted py-4">Belum ada transaksi</p>
        )}

        {data?.map((tx) => {
          const isBuy = tx.type === 'BUY'
          const Icon = isBuy ? ArrowUpRight : ArrowDownLeft
          return (
            <div key={tx.id} className="flex items-center gap-3 py-3">
              <div className="w-9 h-9 rounded-full bg-canvas flex items-center justify-center text-ink shrink-0">
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">
                  {tx.symbol} — {isBuy ? 'Beli' : 'Jual'} {tx.lots} lot
                </p>
                <p className="text-xs text-muted">{formatDateID(tx.transaction_date)}</p>
              </div>
              <p className={`text-sm font-medium whitespace-nowrap ${isBuy ? 'text-loss' : 'text-profit'}`}>
                {isBuy ? '-' : '+'} {formatRupiah(tx.total_amount)}
              </p>
            </div>
          )
        })}
      </Card>
    </div>
  )
}