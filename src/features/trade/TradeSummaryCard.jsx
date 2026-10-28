import Card from '../../components/ui/Card'
import { formatRupiah } from '../../utils/formatCurrency'

export default function TradeSummaryCard({ type, symbol, name, lots, price, total, holding }) {
  const hasSymbol = Boolean(symbol) && Boolean(name)

  return (
    <div className="flex flex-col gap-3 w-full">
      <Card>
        <p className="text-xs text-muted mb-3">Ringkasan transaksi</p>

        {!hasSymbol ? (
          <p className="text-sm text-muted">Isi kode emiten untuk melihat ringkasan</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            <div>
              <p className="font-heading font-semibold text-ink">{symbol}</p>
              <p className="text-xs text-muted truncate">{name}</p>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted">Jenis</span>
              <span className={type === 'BUY' ? 'text-loss' : 'text-profit'}>
                {type === 'BUY' ? 'Beli' : 'Jual'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Harga per lembar</span>
              <span className="text-ink">{price ? formatRupiah(price) : '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Jumlah lot</span>
              <span className="text-ink">{lots > 0 ? lots : '-'}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-line">
              <span className="text-ink font-medium">Total</span>
              <span className="text-ink font-medium">{total > 0 ? formatRupiah(total) : '-'}</span>
            </div>
          </div>
        )}
      </Card>

      {type === 'SELL' && hasSymbol && holding && (
        <Card>
          <p className="text-xs text-muted mb-3">Posisi Anda saat ini</p>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Lot dimiliki</span>
              <span className="text-ink">{holding.net_lots}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Harga rata-rata beli</span>
              <span className="text-ink">{formatRupiah(holding.average_price)}</span>
            </div>
            {holding.current_price && (
              <div className="flex justify-between text-sm">
                <span className="text-muted">Nilai sekarang</span>
                <span className="text-ink">{formatRupiah(holding.current_price * holding.net_lots * 100)}</span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}