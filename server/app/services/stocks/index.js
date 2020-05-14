const axios = require('axios')
const { RAPID_API_HOST, RAPID_API_KEY, STOCK_LANG, STOCK_REGION } = process.env
const baseURI = `https://${RAPID_API_HOST}/market`

exports.getStocksAutocomplete = queryString =>
  axios({
    method: 'GET',
    url: `${baseURI}/auto-complete`,
    headers: {
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      lang: STOCK_LANG,
      region: STOCK_REGION,
      query: queryString,
    },
  })

exports.getStockChart = stockSymbol =>
  axios({
    method: 'GET',
    url: `${baseURI}/get-charts`,
    headers: {
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      region: STOCK_REGION,
      lang: STOCK_LANG,
      symbol: stockSymbol,
      interval: '5m',
      range: '1d',
    },
  })

exports.getCurrentQuotes = stockSymbols =>
  axios({
    method: 'GET',
    url: `${baseURI}/get-quotes`,
    headers: {
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      region: STOCK_REGION,
      lang: STOCK_LANG,
      symbols: encodeURI(stockSymbols.join(',')),
    },
  })
