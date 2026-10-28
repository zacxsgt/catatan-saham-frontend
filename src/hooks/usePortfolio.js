import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPortfolio, getTransactions, createTransaction } from '../api/transactionApi'

export function usePortfolio() {
  return useQuery({ queryKey: ['portfolio'], queryFn: getPortfolio })
}

export function useRecentTransactions(limit = 5) {
  return useQuery({
    queryKey: ['transactions', 'recent'],
    queryFn: () => getTransactions(),
    select: (data) => data.slice(0, limit),
  })
}

// Seluruh riwayat transaksi, tanpa batas jumlah, untuk halaman Riwayat.
export function useAllTransactions() {
  return useQuery({
    queryKey: ['transactions', 'all'],
    queryFn: () => getTransactions(),
  })
}

export function useHolding(symbol) {
  const { data } = usePortfolio()
  return data?.holdings?.find((h) => h.symbol === symbol) ?? null
}

export function useHoldingLots(symbol) {
  const holding = useHolding(symbol)
  return holding?.net_lots ?? 0
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}