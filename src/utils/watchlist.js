export const WATCHLIST = [
  'BBCA', 'BBRI', 'BMRI', 'BBNI', 'TLKM',
  'ASII', 'UNVR', 'ICBP', 'INDF', 'KLBF',
  'ANTM', 'PTBA', 'ADRO', 'UNTR', 'SIDO',
  'DMAS',
]

// Enam saham bergilir setiap hari, dipilih berurutan dari watchlist berdasarkan
// hari dalam setahun, supaya semua orang yang membuka aplikasi di hari yang sama
// melihat enam saham yang sama, tapi besok akan berganti.
export function getDailyWatchlist(count = 6) {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - startOfYear) / 86400000)

  const start = dayOfYear % WATCHLIST.length
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(WATCHLIST[(start + i) % WATCHLIST.length])
  }
  return result
}