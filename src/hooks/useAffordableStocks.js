import { useQueries } from '@tanstack/react-query'
import { getCachedPrice } from '../api/stockApi'
import { WATCHLIST } from '../utils/watchlist'
import useStockSearch from './useStockSearch'

// Catatan: hook ini memanggil useStockSearch untuk tiap simbol di dalam loop,
// yang secara aturan React kurang ideal (jumlah pemanggilan hook berubah-ubah).
// Supaya aman, nama diambil terpisah lewat komponen AffordableStockCard nanti,
// di sini cukup ambil harga saja untuk penyaringan.
export default function useAffordableStocks(budget) {
  const queries = useQueries({
    queries: WATCHLIST.map((symbol) => ({
      queryKey: ['stockPrice', symbol],
      queryFn: () => getCachedPrice(symbol),
      retry: false,
      enabled: budget > 0,
    })),
  })

  const isLoading = budget > 0 && queries.some((q) => q.isLoading)

  const affordable = queries
    .map((q, i) => ({ symbol: WATCHLIST[i], price: q.data?.current_price }))
    .filter((s) => s.price && s.price * 100 <= budget)
    .sort((a, b) => a.price - b.price)

  return { affordable, isLoading }
}