import Card from '../../components/ui/Card'
import { formatRupiah } from '../../utils/formatCurrency'

const DECISION_STYLE = {
  BELI: 'text-profit',
  TAHAN: 'text-ink',
  JUAL: 'text-loss',
}

export default function AnalysisDetailPanel({ symbol, result, isPending, error }) {
  return (
    <Card className="md:sticky md:top-4">
      {!symbol && (
        <p className="text-sm text-muted py-10 text-center">
          Pilih salah satu saham di sebelah kiri untuk melihat analisisnya
        </p>
      )}

      {symbol && isPending && (
        <p className="text-sm text-muted py-10 text-center">
          Menganalisis {symbol}, mohon tunggu beberapa saat...
        </p>
      )}

      {symbol && error && (
        <p className="text-sm text-loss py-10 text-center">{error.message}</p>
      )}

      {symbol && result && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-heading font-semibold text-ink">{symbol}</p>
            <p className="text-sm text-muted">{result.saham.name}</p>
            <p className="text-xs text-muted">{result.saham.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted">Harga saat ini</p>
              <p className="text-sm font-medium text-ink">{formatRupiah(result.saham.current_price)}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Harga wajar</p>
              <p className="text-sm font-medium text-ink">{formatRupiah(result.analisis.harga_wajar)}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Keputusan</p>
              <p className={`text-sm font-semibold ${DECISION_STYLE[result.analisis.keputusan] || 'text-ink'}`}>
                {result.analisis.keputusan}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">Margin of safety</p>
              <p className={`text-sm font-medium ${result.analisis.margin_of_safety >= 0 ? 'text-profit' : 'text-loss'}`}>
                {result.analisis.margin_of_safety}%
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted mb-1">Penjelasan</p>
            <p className="text-sm text-ink leading-relaxed">{result.analisis.analisis}</p>
          </div>

          <div className="pt-3 border-t border-line">
            <p className="text-xs text-muted">Lot maksimal dengan budget Anda</p>
            <p className="text-sm font-medium text-ink">{result.analisis.maks_lot} lot</p>
          </div>

          {result.analisis.catatan_keterbatasan_data && (
            <p className="text-xs text-muted leading-relaxed border-t border-line pt-3">
              {result.analisis.catatan_keterbatasan_data}
            </p>
          )}
        </div>
      )}
    </Card>
  )
}