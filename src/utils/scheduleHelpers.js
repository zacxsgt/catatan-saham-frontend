import { toDateKey } from './formatDate'

// Membuat susunan kotak kalender untuk satu bulan, termasuk sisa tanggal
// bulan sebelum dan sesudahnya supaya grid selalu genap 7 kolom.
export function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, muted: true, dateKey: null })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, muted: false, dateKey: toDateKey(new Date(year, month, d)) })
  }
  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - startWeekday - daysInMonth + 1
    cells.push({ day: nextDay, muted: true, dateKey: null })
  }

  return cells
}

// Tanggal mana saja dalam bulan itu yang punya transaksi Beli dan/atau Jual.
export function getTransactionDatesInMonth(transactions, year, month) {
  const map = {}
  for (const tx of transactions) {
    const txDate = new Date(tx.transaction_date)
    if (txDate.getFullYear() === year && txDate.getMonth() === month) {
      const key = tx.transaction_date
      if (!map[key]) map[key] = { buy: false, sell: false }
      if (tx.type === 'BUY') map[key].buy = true
      else map[key].sell = true
    }
  }
  return map
}

export function filterTransactionsByMonth(transactions, year, month) {
  return transactions
    .filter((tx) => {
      const d = new Date(tx.transaction_date)
      return d.getFullYear() === year && d.getMonth() === month
    })
    .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
}

// Mengelompokkan transaksi ke beberapa periode terakhir (harian, mingguan,
// atau bulanan tergantung pilihan), menjumlahkan nilai Beli dan Jual di
// tiap kelompok. Dipakai untuk grafik tren Beli vs Jual.
export function aggregateByPeriod(transactions, period) {
  const now = new Date()
  const buckets = []

  if (period === 'Minggu') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      buckets.push({ label: `${d.getDate()}/${d.getMonth() + 1}`, start: startOfDay(d), end: endOfDay(d) })
    }
  } else if (period === 'Bulan') {
    for (let i = 7; i >= 0; i--) {
      const end = new Date(now)
      end.setDate(end.getDate() - i * 7)
      const start = new Date(end)
      start.setDate(start.getDate() - 6)
      buckets.push({ label: `${start.getDate()}/${start.getMonth() + 1}`, start: startOfDay(start), end: endOfDay(end) })
    }
  } else {
    const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const start = new Date(d.getFullYear(), d.getMonth(), 1)
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
      buckets.push({ label: MONTHS_SHORT[d.getMonth()], start, end })
    }
  }

  const buyTotals = buckets.map(({ start, end }) => sumInRange(transactions, 'BUY', start, end))
  const sellTotals = buckets.map(({ start, end }) => sumInRange(transactions, 'SELL', start, end))

  return { labels: buckets.map((b) => b.label), buyTotals, sellTotals }
}

function sumInRange(transactions, type, start, end) {
  return transactions
    .filter((tx) => {
      if (tx.type !== type) return false
      const d = new Date(tx.transaction_date)
      return d >= start && d <= end
    })
    .reduce((sum, tx) => sum + Number(tx.total_amount), 0)
}

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function endOfDay(d) {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

// Mengubah deretan angka jadi garis SVG, diskalakan supaya pas di tinggi
// yang ditentukan, dengan sedikit jarak di atas supaya titik tertinggi
// tidak menempel ke tepi.
export function buildLinePath(values, width, height, padding = 10) {
  const max = Math.max(...values, 1)
  const step = width / (values.length - 1 || 1)

  return values
    .map((v, i) => {
      const x = i * step
      const y = height - padding - (v / max) * (height - padding * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}