import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Input from '../../components/ui/Input'
import StockPriceCard from './StockPriceCard'
import useStockSearch from '../../hooks/useStockSearch'
import { getDailyWatchlist } from '../../utils/watchlist'

const DAILY_SIX = getDailyWatchlist(6)

export default function CheckStockPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const queryStock = useStockSearch(query)

  const showSearchResult = query.length === 4
  let searchHint = ''
  let searchError = ''
  if (queryStock.status === 'loading') searchHint = 'Mencari emiten...'
  if (queryStock.status === 'notfound') searchError = queryStock.message

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        aria-label="Kembali"
        className="flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-4"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <h1 className="font-heading text-2xl font-semibold text-ink mb-1">Cek Saham</h1>
      <p className="text-sm text-muted mb-5">Enam emiten populer hari ini, atau cari emiten lain</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {DAILY_SIX.map((symbol) => (
          <StockPriceCard key={symbol} symbol={symbol} />
        ))}
      </div>

      <div className="max-w-sm">
        <Input
          id="search"
          label="Cari kode emiten lain"
          placeholder="Contoh: BBCA"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4))}
          hint={searchHint}
          error={searchError}
        />
      </div>

      {showSearchResult && queryStock.status === 'found' && (
        <div className="max-w-sm mt-3">
          <StockPriceCard symbol={query} />
        </div>
      )}
    </div>
  )
}