import { useState } from 'react'
import Card from '../components/ui/Card'
import BudgetInput from '../features/analysis/BudgetInput'
import RecommendedStockList from '../features/analysis/RecommendedStockList'
import AnalysisDetailPanel from '../features/analysis/AnalysisDetailPanel'
import useAffordableStocks from '../hooks/useAffordableStocks'
import useAnalyzeStock from '../hooks/useAnalyzeStock'

export default function AnalysisRoute() {
  const [budgetRaw, setBudgetRaw] = useState('')
  const [selectedSymbol, setSelectedSymbol] = useState(null)

  const budget = Number(budgetRaw) || 0
  const { affordable, isLoading } = useAffordableStocks(budget)
  const { mutate: analyzeStock, data: result, isPending, error, reset } = useAnalyzeStock()

  function handleSelect(symbol) {
    setSelectedSymbol(symbol)
    reset() // bersihkan hasil analisis saham sebelumnya supaya tidak sempat terlihat sesaat
    analyzeStock({ symbol, budget })
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl">
      <h1 className="font-heading text-2xl font-semibold text-ink mb-1">Analisis</h1>
      <p className="text-sm text-muted mb-5">Masukkan budget untuk melihat saham yang terjangkau</p>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-4 items-start">
        <div className="flex flex-col gap-4">
          <Card>
            <BudgetInput value={budgetRaw} onChange={setBudgetRaw} />
          </Card>

          {budget > 0 && (
            <RecommendedStockList
              stocks={affordable}
              budget={budget}
              isLoading={isLoading}
              selectedSymbol={selectedSymbol}
              onSelect={handleSelect}
            />
          )}
        </div>

        <AnalysisDetailPanel
          symbol={selectedSymbol}
          result={result}
          isPending={isPending}
          error={error}
        />
      </div>
    </div>
  )
}