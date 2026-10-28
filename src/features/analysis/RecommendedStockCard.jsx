import Card from '../../components/ui/Card'
import useStockSearch from '../../hooks/useStockSearch'
import { formatRupiah } from '../../utils/formatCurrency'

export default function RecommendedStockCard({ symbol, price, budget, isSelected, onSelect }) {
  const stock = useStockSearch(symbol)
  const maxLots = Math.floor(budget / (price * 100))

  return (
    <button onClick={() => onSelect(symbol)} className="text-left w-full">
      <Card className={`transition-colors ${isSelected ? 'ring-2 ring-profit' : 'hover:bg-canvas'}`}>
        <p className="font-heading font-semibold text-ink">{symbol}</p>
        <p className="text-xs text-muted truncate mb-2">
          {stock.status === 'found' ? stock.name : 'Memuat nama...'}
        </p>
        <p className="text-sm text-ink">{formatRupiah(price)} <span className="text-muted">/ lembar</span></p>
        <p className="text-xs text-profit mt-1">Maksimal {maxLots} lot</p>
      </Card>
    </button>
  )
}