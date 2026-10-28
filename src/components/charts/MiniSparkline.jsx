import { useState } from 'react'
import Pill from '../ui/Pill'

const PERIODS = ['Minggu', 'Bulan', 'Tahun']

// SEMENTARA: backend belum punya riwayat nilai portofolio harian, jadi
// ketiga garis ini masih data contoh untuk tampilan. Ganti isi SAMPLES
// dengan hasil endpoint riwayat begitu tersedia di backend.
const SAMPLES = {
  Minggu: 'M0,80 C25,70 55,90 85,60 C120,35 150,70 185,50 C215,35 245,60 280,25 C310,10 340,30 400,5',
  Bulan: 'M0,95 C30,60 55,110 85,80 C120,44 150,100 185,78 C215,60 245,95 280,55 C310,28 340,50 400,15',
  Tahun: 'M0,100 C40,95 70,85 110,70 C150,55 180,60 220,40 C260,25 300,30 340,15 C360,8 380,10 400,4',
}

export default function MiniSparkline() {
  const [period, setPeriod] = useState('Bulan')

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted">Kinerja portofolio</p>
        <div className="flex gap-1.5">
          {PERIODS.map((p) => (
            <Pill key={p} active={period === p} onClick={() => setPeriod(p)}>
              {p}
            </Pill>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 400 110" className="w-full h-24 overflow-visible">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-profit)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-profit)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${SAMPLES[period]} L400,110 L0,110 Z`} fill="url(#sparkFill)" />
        <path
          key={period}
          d={SAMPLES[period]}
          fill="none"
          stroke="var(--color-profit)"
          strokeWidth="2.4"
          className="animate-[drawline_1s_ease_forwards]"
          style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
        />
      </svg>
    </div>
  )
}