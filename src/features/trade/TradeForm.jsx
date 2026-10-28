import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import TradeSummaryCard from './TradeSummaryCard'
import useStockSearch from '../../hooks/useStockSearch'
import useStockPrice from '../../hooks/useStockPrice'
import { useHolding, useCreateTransaction } from '../../hooks/usePortfolio'
import { formatRupiah } from '../../utils/formatCurrency'

const TITLES = { BUY: 'Beli Saham', SELL: 'Jual Saham' }
const BUTTON_LABELS = { BUY: 'Beli', SELL: 'Jual' }

export default function TradeForm({ type }) {
  const navigate = useNavigate()
  const createTransaction = useCreateTransaction()

  const [symbol, setSymbol] = useState('')
  const [lots, setLots] = useState('')
  const [lotsTouched, setLotsTouched] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const stock = useStockSearch(symbol)
  const priceQuery = useStockPrice(symbol)
  const holding = useHolding(symbol)
  const ownedLots = holding?.net_lots ?? 0

  const hasValidSymbol = stock.status === 'found'
  const hasPrice = priceQuery.isSuccess
  const price = priceQuery.data?.current_price ?? 0
  const numericLots = Number(lots)

  let symbolHint = ''
  let symbolError = ''
  if (stock.status === 'loading') symbolHint = 'Mencari emiten...'
  if (stock.status === 'found') symbolHint = stock.name
  if (stock.status === 'notfound') symbolError = stock.message

  let priceHint = ''
  if (hasValidSymbol && priceQuery.isLoading) priceHint = 'Mengambil harga...'
  if (hasValidSymbol && priceQuery.isError) priceHint = priceQuery.error.message
  if (hasValidSymbol && hasPrice) priceHint = `Harga cache: ${formatRupiah(price)} per lembar`

  const lotsError =
    lotsTouched && !(numericLots > 0)
      ? 'Lot harus lebih dari 0'
      : type === 'SELL' && lotsTouched && numericLots > ownedLots
      ? `Lot yang dimiliki hanya ${ownedLots}`
      : ''

  const total = numericLots > 0 && hasPrice ? numericLots * 100 * price : 0

  const canSubmit =
    hasValidSymbol &&
    hasPrice &&
    numericLots > 0 &&
    (type === 'BUY' || numericLots <= ownedLots) &&
    !createTransaction.isPending

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitError('')

    try {
      await createTransaction.mutateAsync({
        symbol,
        type,
        lots: numericLots,
        price_per_share: price,
      })
      navigate('/home')
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <button
        onClick={() => navigate(-1)}
        aria-label="Kembali"
        className="flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-4"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <h1 className="font-heading text-2xl font-semibold text-ink mb-5">{TITLES[type]}</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full md:flex-1 md:max-w-xl">
          <Input
            id="symbol"
            label="Kode emiten"
            placeholder="Contoh: BBCA"
            autoComplete="off"
            value={symbol}
            onChange={(e) =>
              setSymbol(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4))
            }
            hint={symbolHint}
            error={symbolError}
          />

          {type === 'SELL' && hasValidSymbol && (
            <p className="text-xs text-muted -mt-1.5">Lot yang Anda miliki saat ini: {ownedLots}</p>
          )}

          <Input
            id="lots"
            label="Jumlah lot"
            placeholder="0"
            inputMode="numeric"
            disabled={!hasValidSymbol}
            value={lots}
            onChange={(e) => {
              setLots(e.target.value.replace(/\D/g, ''))
              setLotsTouched(true)
            }}
            onBlur={() => setLotsTouched(true)}
            error={lotsError}
          />

          <Input
            id="price"
            label="Harga per lembar (Rp)"
            disabled
            value={hasPrice ? price.toLocaleString('id-ID') : ''}
            placeholder={hasValidSymbol ? '' : 'Isi kode emiten dulu'}
            hint={priceHint}
          />

          {submitError && <p className="text-sm text-loss text-center">{submitError}</p>}

          <Button type="submit" disabled={!canSubmit} className="mt-1">
            {createTransaction.isPending ? 'Menyimpan...' : BUTTON_LABELS[type]}
          </Button>
        </form>

        <div className="w-full md:flex-1">
          <TradeSummaryCard
            type={type}
            symbol={hasValidSymbol ? symbol : ''}
            name={stock.name}
            lots={numericLots}
            price={price}
            total={total}
            holding={holding}
          />
        </div>
      </div>
    </div>
  )
}