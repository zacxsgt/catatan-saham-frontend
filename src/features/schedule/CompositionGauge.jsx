import Card from '../../components/ui/Card'
import { FULL_MONTHS } from '../../utils/formatDate'

export default function CompositionGauge({ year, month, transactions }) {
  const buyTotal = transactions.filter((tx) => tx.type === 'BUY').reduce((s, tx) => s + Number(tx.total_amount), 0)
  const sellTotal = transactions.filter((tx) => tx.type === 'SELL').reduce((s, tx) => s + Number(tx.total_amount), 0)
  const total = buyTotal + sellTotal

  if (total === 0) {
    return (
      <Card>
        <p className="text-sm font-medium text-ink mb-4">Komposisi {FULL_MONTHS[month]}</p>
        <p className="text-sm text-muted py-10 text-center">Belum ada transaksi bulan ini</p>
      </Card>
    )
  }

  const buyPercent = Math.round((buyTotal / total) * 100)
  const sellPercent = 100 - buyPercent
  const circumference = 145 // keliling setengah lingkaran untuk radius 46
  const buyDash = (buyPercent / 100) * circumference
  const sellDash = (sellPercent / 100) * circumference

  return (
    <Card>
      <p className="text-sm font-medium text-ink mb-4">Komposisi {FULL_MONTHS[month]}</p>
      <div className="flex justify-center">
        <svg viewBox="0 0 120 90" width="150" height="112" style={{ overflow: 'visible' }}>
          <path d="M14,70 A46,46 0 0 1 106,70" fill="none" stroke="var(--color-loss)" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${buyDash} ${circumference}`} />
          <path d="M14,70 A46,46 0 0 1 106,70" fill="none" stroke="var(--color-profit)" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${sellDash} ${circumference}`} strokeDashoffset={-buyDash} />
          <text x="60" y="60" textAnchor="middle" fontFamily="Space Grotesk" fontSize="20" fontWeight="600" fill="var(--color-ink)">{buyPercent}%</text>
          <text x="60" y="75" textAnchor="middle" fontFamily="Inter" fontSize="8.5" fill="var(--color-muted)">Transaksi beli</text>
        </svg>
      </div>
      <div className="flex justify-center gap-5 text-xs mt-2">
        <span className="flex items-center gap-1.5 text-muted"><span className="w-2 h-2 rounded-full bg-loss" /> Beli {buyPercent}%</span>
        <span className="flex items-center gap-1.5 text-muted"><span className="w-2 h-2 rounded-full bg-profit" /> Jual {sellPercent}%</span>
      </div>
    </Card>
  )
}