const STOCKS_KEY = 'SELECTED_STOCKS'

export const saveStocks = stocks => {
  localStorage.setItem(STOCKS_KEY, JSON.stringify(stocks))
}

export const loadStocks = stocks => {
  return JSON.parse(localStorage.getItem(STOCKS_KEY)) || []
}
