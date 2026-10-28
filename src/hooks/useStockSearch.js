import { useQuery } from '@tanstack/react-query'
import { getCachedPrice } from '../api/stockApi'

// Memakai queryKey yang sama persis dengan useStockPrice, supaya kalau keduanya
// dipakai untuk simbol yang sama dalam satu komponen, cuma terjadi satu kali
// panggilan jaringan sungguhan, bukan dua kali untuk data yang sama.
export default function useStockSearch(symbol) {
  const query = useQuery({
    queryKey: ['stockPrice', symbol],
    queryFn: () => getCachedPrice(symbol),
    enabled: symbol.length === 4,
    retry: false,
  })

  if (symbol.length !== 4) return { status: 'idle', name: '', message: '' }
  if (query.isLoading) return { status: 'loading', name: '', message: '' }
  if (query.isError) {
    return { status: 'notfound', name: '', message: query.error?.message || 'Emiten tidak ditemukan' }
  }
  return { status: 'found', name: query.data?.name || '', message: '' }
}