import { useMutation } from '@tanstack/react-query'
import { analyzeStock } from '../api/stockApi'

export default function useAnalyzeStock() {
  return useMutation({
    mutationFn: ({ symbol, budget }) => analyzeStock(symbol, budget),
  })
}