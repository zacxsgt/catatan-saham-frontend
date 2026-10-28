import { useState } from 'react'
import TransactionCalendar from '../features/schedule/TransactionCalendar'
import MonthlyTransactionList from '../features/schedule/MonthlyTransactionList'
import BuySellWaveChart from '../features/schedule/BuySellWaveChart'
import CompositionGauge from '../features/schedule/CompositionGauge'
import { useAllTransactions } from '../hooks/usePortfolio'
import { filterTransactionsByMonth } from '../utils/scheduleHelpers'

export default function ScheduleRoute() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  const { data: allTransactions, isLoading, isError, error, refetch } = useAllTransactions()

  if (isLoading) {
    return <div className="p-4 md:p-8"><p className="text-sm text-muted">Memuat...</p></div>
  }

  if (isError) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-sm text-loss mb-2">{error.message}</p>
        <button onClick={() => refetch()} className="text-sm text-ink underline">Coba lagi</button>
      </div>
    )
  }

  function handleChangeMonth(y, m) {
    setYear(y)
    setMonth(m)
    setSelectedDate(null) // bulan ganti, filter tanggal sebelumnya tidak relevan lagi
  }

  function handleSelectDate(dateKey) {
    if (!dateKey) return
    setSelectedDate((prev) => (prev === dateKey ? null : dateKey)) // klik ulang tanggal yang sama untuk batal pilih
  }

  const monthTransactions = filterTransactionsByMonth(allTransactions, year, month)
  const listTransactions = selectedDate
    ? monthTransactions.filter((tx) => tx.transaction_date === selectedDate)
    : monthTransactions

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <h1 className="font-heading text-2xl font-semibold text-ink mb-1">Jadwal</h1>
      <p className="text-sm text-muted mb-5">Riwayat beli dan jual berdasarkan tanggal</p>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-4">
        <TransactionCalendar
          year={year}
          month={month}
          onChangeMonth={handleChangeMonth}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          transactions={allTransactions}
        />
        <div style={{ height: 300 }}>
          <MonthlyTransactionList
            year={year}
            month={month}
            selectedDate={selectedDate}
            transactions={listTransactions}
          />
        </div>

        <BuySellWaveChart transactions={allTransactions} />
        <CompositionGauge year={year} month={month} transactions={monthTransactions} />
      </div>
    </div>
  )
}