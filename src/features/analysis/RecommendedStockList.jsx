import RecommendedStockCard from './RecommendedStockCard'

export default function RecommendedStockList({ stocks, budget, isLoading, selectedSymbol, onSelect }) {
  if (isLoading) {
    return <p className="text-sm text-muted py-6 text-center">Mencari saham yang terjangkau...</p>
  }

  if (stocks.length === 0) {
    return (
      <p className="text-sm text-muted py-6 text-center">
        Tidak ada saham dalam watchlist yang terjangkau dengan budget ini
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {stocks.map(({ symbol, price }) => (
        <RecommendedStockCard
          key={symbol}
          symbol={symbol}
          price={price}
          budget={budget}
          isSelected={symbol === selectedSymbol}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}