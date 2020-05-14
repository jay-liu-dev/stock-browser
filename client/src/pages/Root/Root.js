import React, { useEffect } from 'react'
import useStockSeries from 'hooks/useStockSeries'
import useRealTimeQuotes from 'hooks/useRealTimeQuotes'
import StockSelector from 'components/Stock/Selector/Selector'
import StockChart from 'components/Stock/Chart/Chart'

import './Root.scss'

const RootPage = () => {
  const { series, stocks, setStocks, addQuotes } = useStockSeries(true)
  const { watchStocks } = useRealTimeQuotes(addQuotes)

  useEffect(() => {
    watchStocks(stocks)
  }, [stocks, watchStocks])

  return (
    <div className="page root">
      <h1>Stock Quotes</h1>
      <StockSelector value={stocks} onChange={setStocks} />
      <StockChart series={series} />
    </div>
  )
}

RootPage.displayName = 'RootPage'

export default RootPage
