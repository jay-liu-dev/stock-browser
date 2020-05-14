const express = require('express')
const router = express.Router()

const { getStocksAutocomplete, getStockChart } = require('../../services/stocks')
const defaultStocks = require('../../services/stocks/defaults.json')
const { stocksFromStocksAutocomplete, simplifyStockChart } = require('../../utils/transform')

router.get('/autocomplete/:queryString?', stocksAutocomplete)
router.get('/chart/:stockSymbol', stockChart)

async function stocksAutocomplete(req, res, next) {
  const { queryString } = req.params

  if (!queryString) {
    return res.status(200).json({ stocks: defaultStocks })
  }

  try {
    const response = await getStocksAutocomplete(queryString)
    const stocks = stocksFromStocksAutocomplete(response.data)

    res.status(200).json({
      stocks,
    })
  } catch (error) {
    console.log(error)
    next({
      message: error.message || 'Error while fetching the stocks autocomplete',
    })
  }
}

async function stockChart(req, res, next) {
  const { stockSymbol } = req.params

  try {
    const response = await getStockChart(stockSymbol)
    const dataset = simplifyStockChart(response.data)

    res.status(200).json({
      dataset
    })
  } catch (error) {
    console.log(error)
    res.status(200).json({ dataset: [] })
  }
}

module.exports = router
