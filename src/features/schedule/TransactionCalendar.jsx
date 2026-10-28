import { ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '../../components/ui/Card'
import { getMonthGrid, getTransactionDatesInMonth } from '../../utils/scheduleHelpers'
import { FULL_MONTHS, DAY_NAMES } from '../../utils/formatDate'

export default function TransactionCalendar({ year, month, onChangeMonth, selectedDate, onSelectDate, transactions }) {
  const cells = getMonthGrid(year, month)
  const markedDates = getTransactionDatesInMonth(transactions, year, month)
  const todayKey = new Date().toISOString().slice(0, 10)

  function goPrev() {
    if (month === 0) onChangeMonth(year - 1, 11)
    else onChangeMonth(year, month - 1)
  }

  function goNext() {
    if (month === 11) onChangeMonth(year + 1, 0)
    else onChangeMonth(year, month + 1)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <span className="font-heading font-semibold text-sm text-ink">
          {FULL_MONTHS[month]} {year}
        </span>
        <div className="flex gap-1">
          <button onClick={goPrev} aria-label="Bulan sebelumnya" className="w-7 h-7 rounded-lg border border-line text-muted hover:text-ink flex items-center justify-center">
            <ChevronLeft size={14} />
          </button>
          <button onClick={goNext} aria-label="Bulan berikutnya" className="w-7 h-7 rounded-lg border border-line text-muted hover:text-ink flex items-center justify-center">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-[10px] text-muted pb-1.5">{d}</div>
        ))}

        {cells.map((cell, i) => {
          const marks = cell.dateKey ? markedDates[cell.dateKey] : null
          const isToday = cell.dateKey === todayKey
          const isSelected = cell.dateKey && cell.dateKey === selectedDate

          return (
            <button
              key={i}
              disabled={cell.muted}
              onClick={() => onSelectDate(cell.dateKey)}
              className={`text-xs py-1.5 rounded-lg transition-colors ${
                cell.muted
                  ? 'text-line cursor-default'
                  : isSelected
                  ? 'bg-ink text-canvas font-medium ring-2 ring-profit ring-offset-1 ring-offset-surface'
                  : isToday
                  ? 'bg-ink text-canvas font-medium'
                  : 'text-ink hover:bg-canvas'
              }`}
            >
              {cell.day}
              {marks && (
                <div className="flex justify-center gap-0.5 mt-0.5">
                  {marks.buy && <span className="w-1 h-1 rounded-full bg-loss" />}
                  {marks.sell && <span className="w-1 h-1 rounded-full bg-profit" />}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </Card>
  )
}