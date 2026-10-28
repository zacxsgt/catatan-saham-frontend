import { useParams } from 'react-router-dom'
import TradeForm from '../features/trade/TradeForm'
import CheckStockPage from '../features/trade/CheckStockPage'

export default function TradeRoute() {
  const { mode } = useParams()

  if (mode === 'buy') return <TradeForm type="BUY" />
  if (mode === 'sell') return <TradeForm type="SELL" />
  return <CheckStockPage />
}