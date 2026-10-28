import Card from '../components/ui/Card'
import TransactionTable from '../features/history/TransactionTable'
import { useAllTransactions } from '../hooks/usePortfolio'

export default function HistoryRoute() {
  const { data, isLoading, isError, error, refetch } = useAllTransactions()

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <h1 className="font-heading text-2xl font-semibold text-ink mb-1">Riwayat</h1>
      <p className="text-sm text-muted mb-5">Seluruh transaksi yang pernah Anda catat</p>

      <Card padding="px-4">
        {isLoading && <p className="text-sm text-muted py-6 text-center">Memuat...</p>}

        {isError && (
          <div className="py-6 text-center">
            <p className="text-sm text-loss mb-2">{error.message}</p>
            <button onClick={() => refetch()} className="text-sm text-ink underline">
              Coba lagi
            </button>
          </div>
        )}

        {data && <TransactionTable transactions={data} />}
      </Card>
    </div>
  )
}