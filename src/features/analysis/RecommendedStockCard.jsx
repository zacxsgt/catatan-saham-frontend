import Card from '../../components/ui/Card'
import { formatRupiah } from '../../utils/formatCurrency'

export default function RecommendedStockCard({ symbol, name, price, budget, isSelected, onSelect }) {
  const maxLots = Math.floor(budget / (price * 100))

  return (
    <button onClick={() => onSelect(symbol)} className="text-left w-full">
      <Card className={`transition-colors ${isSelected ? 'ring-2 ring-profit' : 'hover:bg-canvas'}`}>
        <p className="font-heading font-semibold text-ink">{symbol}</p>
        <p className="text-xs text-muted truncate mb-2">{name}</p>
        <p className="text-sm text-ink">{formatRupiah(price)} <span className="text-muted">/ lembar</span></p>
        <p className="text-xs text-profit mt-1">Maksimal {maxLots} lot</p>
      </Card>
    </button>
  )
}