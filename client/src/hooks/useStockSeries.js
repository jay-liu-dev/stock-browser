import { useEffect, useState, useRef } from 'react'
import differenceBy from 'lodash/differenceBy'
import uniqBy from 'lodash/uniqBy'
import { getStockChart } from 'services/stocks'
import { saveStocks, loadStocks } from 'services/cache'

const getAddedStocks = (prevStocks, stocks) =>
  differenceBy(stocks, prevStocks, 'symbol')
const getRemovedStocks = (prevStocks, stocks) =>
  differenceBy(prevStocks, stocks, 'symbol')

const useStockSeries = (enableCache = false) => {
  const [series, setSeries] = useState([])
  const [stocks, setStocks] = useState([])
  const prevStocks = useRef([])

  useEffect(() => {
    if (enableCache) {
      setStocks(loadStocks())
    }
  }, [])

  useEffect(() => {
    const addedStocks = getAddedStocks(prevStocks.current, stocks)
    const removedStocks = getRemovedStocks(prevStocks.current, stocks)

    addedStocks.forEach(stock => handleNewStock(stock))
    removedStocks.forEach(stock => handleOldStock(stock))

    prevStocks.current = stocks

    if (enableCache) {
      saveStocks(stocks)
    }
  }, [stocks])

  const handleNewStock = async stock => {
    const dataset = await getStockChart(stock.symbol)

    setSeries(series =>
      uniqBy(
        [
          ...series,
          {
            stock,
            dataset,
          },
        ],
        'stock.symbol',
      ),
    )
  }

  const handleOldStock = stock => {
    setSeries(series =>
      series.filter(data => data.stock.symbol !== stock.symbol),
    )
  }

  const handleNewQuotes = quotes => {
    setSeries(series => {
      const newSeries = [...series]
      quotes.forEach(data => {
        const { symbol, timestamp, quote } = data
        const quoteIndex = newSeries.findIndex(
          ({ stock }) => stock.symbol === symbol,
        )

        if (quoteIndex !== -1) {
          newSeries[quoteIndex].dataset.push({ timestamp, quote })
        }
      })

      return newSeries
    })
  }

  return {
    series,
    stocks,
    setStocks,
    addQuotes: handleNewQuotes,
  }
}

export default useStockSeries
