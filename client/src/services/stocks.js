import axios from 'axios'

const baseURI = `/api/stocks`

export const getStocksAutocomplete = async queryString => {
  try {
    const response = await axios.get(`${baseURI}/autocomplete/${queryString}`)
    return response.data.stocks
  } catch (error) {
    return []
  }
}

export const getStockChart = async stockSymbol => {
  try {
    const response = await axios.get(`${baseURI}/chart/${stockSymbol}`)
    return response.data.dataset
  } catch (error) {
    return []
  }
}
