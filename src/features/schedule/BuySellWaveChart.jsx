import { useState } from 'react'
import Card from '../../components/ui/Card'
import { aggregateByPeriod, buildLinePath } from '../../utils/scheduleHelpers'
import { formatRupiah } from '../../utils/formatCurrency'

const PERIODS = ['Minggu', 'Bulan', 'Tahun']
const WIDTH = 400
const HEIGHT = 120

export default function BuySellWaveChart({ transactions }) {
  const [period, setPeriod] = useState('Bulan')
  const { labels, buyTotals, sellTotals } = aggregateByPeriod(transactions, period)

  const hasData = buyTotals.some((v) => v > 0) || sellTotals.some((v) => v > 0)
  const totalBuy = buyTotals.reduce((a, b) => a + b, 0)
  const totalSell = sellTotals.reduce((a, b) => a + b, 0)

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-ink">Beli vs jual</p>
        <div className="flex gap-1.5">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1 rounded-full border ${
                period === p ? 'bg-ink text-canvas border-ink' : 'border-line text-muted hover:text-ink'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {!hasData ? (
        <p className="text-sm text-muted py-10 text-center">Belum ada transaksi pada periode ini</p>
      ) : (
        <>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-28 overflow-visible">
            <path
              key={`sell-${period}`}
              d={buildLinePath(sellTotals, WIDTH, HEIGHT)}
              fill="none"
              stroke="var(--color-profit)"
              strokeWidth="2.2"
              style={{ strokeDasharray: 900, strokeDashoffset: 900 }}
              className="animate-[drawline_1s_ease_forwards]"
            />
            <path
              key={`buy-${period}`}
              d={buildLinePath(buyTotals, WIDTH, HEIGHT)}
              fill="none"
              stroke="var(--color-loss)"
              strokeWidth="2.2"
              style={{ strokeDasharray: 900, strokeDashoffset: 900, animationDelay: '.15s' }}
              className="animate-[drawline_1s_ease_forwards]"
            />
          </svg>

          <div className="flex justify-between text-[10px] text-muted mt-1 mb-3">
            <span>{labels[0]}</span>
            <span>{labels[labels.length - 1]}</span>
          </div>

          <div className="flex gap-5 text-xs mb-2">
            <span className="flex items-center gap-1.5 text-muted">
              <span className="w-2 h-2 rounded-full bg-profit" /> Jual {formatRupiah(totalSell)}
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <span className="w-2 h-2 rounded-full bg-loss" /> Beli {formatRupiah(totalBuy)}
            </span>
          </div>
        </>
      )}
    </Card>
  )
}