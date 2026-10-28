import { useQuery } from '@tanstack/react-query'
import { getCachedPrice } from '../api/stockApi'

export default function useStockPrice(symbol) {
  return useQuery({
    queryKey: ['stockPrice', symbol],
    queryFn: () => getCachedPrice(symbol),
    enabled: symbol.length === 4,
    retry: false, // kalau belum ada di cache, tidak perlu dicoba ulang otomatis
  })
}