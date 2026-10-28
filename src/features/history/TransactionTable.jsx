import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { formatRupiah } from '../../utils/formatCurrency'
import { formatDateID } from '../../utils/formatDate'

export default function TransactionTable({ transactions, emptyMessage = 'Belum ada transaksi tercatat' }) {
  if (transactions.length === 0) {
    return <p className="text-sm text-muted py-6 text-center">{emptyMessage}</p>
  }

  return (
    <div className="divide-y divide-line">
      {transactions.map((tx) => {
        const isBuy = tx.type === 'BUY'
        const Icon = isBuy ? ArrowUpRight : ArrowDownLeft
        return (
          <div key={tx.id} className="flex items-center gap-3 py-3">
            <div className="w-9 h-9 rounded-full bg-canvas flex items-center justify-center text-ink shrink-0">
              <Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">
                {tx.symbol} &middot; {tx.stock_name}
              </p>
              <p className="text-xs text-muted">
                {isBuy ? 'Beli' : 'Jual'} {tx.lots} lot &middot; {formatDateID(tx.transaction_date)}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-sm font-medium ${isBuy ? 'text-loss' : 'text-profit'}`}>
                {isBuy ? '-' : '+'} {formatRupiah(tx.total_amount)}
              </p>
              <p className="text-xs text-muted">{formatRupiah(tx.price_per_share)} / lembar</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}