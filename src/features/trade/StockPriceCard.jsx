import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import useStockSearch from '../../hooks/useStockSearch'
import useStockPrice from '../../hooks/useStockPrice'
import { formatRupiah } from '../../utils/formatCurrency'

export default function StockPriceCard({ symbol }) {
  const stock = useStockSearch(symbol)
  const priceQuery = useStockPrice(symbol)

  const name = stock.status === 'found' ? stock.name : symbol
  const isLoading = stock.status === 'loading' || priceQuery.isLoading
  const price = priceQuery.data?.current_price

  return (
    <Card className="flex flex-col gap-2">
      <div>
        <p className="font-heading font-semibold text-ink">{symbol}</p>
        <p className="text-xs text-muted truncate">{isLoading ? 'Memuat...' : name}</p>
      </div>

      {isLoading ? (
        <div className="h-5 w-24 bg-line rounded animate-pulse" />
      ) : price ? (
        <div>
          <p className="text-lg font-heading font-semibold text-ink">{formatRupiah(price)}</p>
          <p className="text-xs text-muted">per lembar &middot; {formatRupiah(price * 100)} per lot</p>
        </div>
      ) : (
        <p className="text-xs text-loss">Harga belum tersedia</p>
      )}

      <div className="flex gap-2 mt-1">
        <Link to="/trade/buy" className="text-xs text-ink underline">Beli</Link>
        <Link to="/trade/sell" className="text-xs text-ink underline">Jual</Link>
      </div>
    </Card>
  )
}