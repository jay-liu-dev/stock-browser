const _ = require('lodash')
const roundToNearestMinutes = require('date-fns/roundToNearestMinutes')

exports.stocksFromStocksAutocomplete = res =>
  _.get(res, 'ResultSet.Result', []).map(stock => ({
    name: stock.name,
    symbol: stock.symbol,
  }))

exports.simplifyStockChart = res => {
  const timestamps = _.get(res, 'chart.result[0].timestamp', [])
  const quotes = _.get(res, 'chart.result[0].indicators.quote[0].close', [])

  return timestamps.map((timestamp, index) => ({
    timestamp,
    quote: quotes[index],
  }))
}

exports.simplifyQuotes = res => {
  const quotes = _.get(res, 'quoteResponse.result', [])

  return quotes.map(quote => ({
    symbol: quote.symbol,
    timestamp:
      roundToNearestMinutes(quote.regularMarketTime * 1000).getTime() / 1000,
    quote: quote.regularMarketPrice,
  }))
}
