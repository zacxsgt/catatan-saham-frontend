import { useQuery } from '@tanstack/react-query'
import { getAllCachedPrices } from '../api/stockApi'

export default function useAffordableStocks(budget) {
  const query = useQuery({
    queryKey: ['allCachedPrices'],
    queryFn: getAllCachedPrices,
    staleTime: 60 * 1000,
  })

  const all = query.data ?? []

  const affordable =
    budget > 0
      ? all
          .filter((s) => s.current_price && s.current_price * 100 <= budget)
          .sort((a, b) => a.current_price - b.current_price)
      : []

  return {
    affordable,
    totalCached: all.length,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}