import RecommendedStockCard from './RecommendedStockCard'

export default function RecommendedStockList({ stocks, budget, totalCached, selectedSymbol, onSelect }) {
  if (totalCached === 0) {
    return (
      <p className="text-sm text-muted py-6 text-center">
        Belum ada harga saham yang tersimpan. Harga diperbarui otomatis pada jam bursa,
        atau cari saham di menu Cek Saham untuk menyimpannya.
      </p>
    )
  }

  if (stocks.length === 0) {
    return (
      <p className="text-sm text-muted py-6 text-center">
        Tidak ada saham yang terjangkau dengan budget ini dari {totalCached} saham yang tersimpan
      </p>
    )
  }

  return (
    <div>
      <p className="text-xs text-muted mb-2">
        {stocks.length} dari {totalCached} saham tersimpan terjangkau dengan budget ini
      </p>
      <div className="grid grid-cols-2 gap-3">
        {stocks.map((s) => (
          <RecommendedStockCard
            key={s.symbol}
            symbol={s.symbol}
            name={s.name}
            price={s.current_price}
            budget={budget}
            isSelected={s.symbol === selectedSymbol}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}