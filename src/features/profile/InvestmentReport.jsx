import { useState } from 'react'
import Card from '../../components/ui/Card'
import { usePortfolio } from '../../hooks/usePortfolio'
import { formatRupiah } from '../../utils/formatCurrency'

const PERIODS = ['Minggu', 'Bulan', 'Tahun']

// SEMENTARA: backend belum menyimpan riwayat nilai portofolio harian,
// jadi bentuk garis ini masih contoh. Angka ringkasan di bawahnya sudah data asli.
const SAMPLE_PATHS = {
  Minggu: 'M0,70 C40,60 80,75 120,55 C160,40 200,60 240,30 C280,15 320,35 400,10',
  Bulan: 'M0,95 C50,75 100,85 150,55 C200,40 250,65 300,30 C330,15 360,30 400,10',
  Tahun: 'M0,100 C60,90 120,70 180,60 C240,45 300,50 340,20 C360,10 380,15 400,5',
}

export default function InvestmentReport() {
  const [period, setPeriod] = useState('Bulan')
  const { data, isLoading } = usePortfolio()

  const summary = data?.summary
  const hasHoldings = (data?.holdings?.length ?? 0) > 0
  const isProfit = (summary?.total_unrealized_gain_loss ?? 0) >= 0

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-ink">Laporan investasi</p>
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

      {!isLoading && !hasHoldings ? (
        <p className="text-sm text-muted py-6 text-center">
          Laporan akan muncul setelah ada transaksi
        </p>
      ) : (
        <svg viewBox="0 0 400 110" className="w-full h-28 overflow-visible mb-4">
          <defs>
            <linearGradient id="reportFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-profit)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-profit)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${SAMPLE_PATHS[period]} L400,110 L0,110 Z`} fill="url(#reportFill)" />
          <path
            key={period}
            d={SAMPLE_PATHS[period]}
            fill="none"
            stroke="var(--color-profit)"
            strokeWidth="2.4"
            style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
            className="animate-[drawline_1s_ease_forwards]"
          />
        </svg>
      )}

      {summary && hasHoldings && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted">Nilai sekarang</p>
            <p className="text-sm font-medium text-ink">{formatRupiah(summary.total_current_value)}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Modal</p>
            <p className="text-sm font-medium text-ink">{formatRupiah(summary.total_invested)}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Untung/rugi</p>
            <p className={`text-sm font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
              {formatRupiah(summary.total_unrealized_gain_loss)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Persentase</p>
            <p className={`text-sm font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
              {summary.total_unrealized_gain_loss_percent}%
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}