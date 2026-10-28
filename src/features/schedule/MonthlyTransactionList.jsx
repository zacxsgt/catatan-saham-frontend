import Card from '../../components/ui/Card'
import TransactionTable from '../history/TransactionTable'
import { FULL_MONTHS, formatDateID } from '../../utils/formatDate'

export default function MonthlyTransactionList({ year, month, selectedDate, transactions }) {
  const title = selectedDate
    ? `Transaksi ${formatDateID(selectedDate)}`
    : `Transaksi ${FULL_MONTHS[month]}`

  const emptyMessage = selectedDate
    ? 'Tidak ada transaksi pada tanggal ini'
    : 'Belum ada transaksi bulan ini'

  return (
    <Card className="flex flex-col h-full" padding="p-4">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <p className="text-sm font-medium text-ink">{title}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <TransactionTable transactions={transactions} emptyMessage={emptyMessage} />
      </div>
    </Card>
  )
}