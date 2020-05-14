const { getCurrentQuotes } = require('../../services/stocks')
const { simplifyQuotes } = require('../../utils/transform')

const INQUIRY_INTERVAL = 1000 * 60 * 5 // Yahoo stock is updated every 5 mins

const socket = io => {
  io.on('connection', socket => {
    console.log('New client connected')

    let stockSymbols = []
    const interval = setInterval(async () => {
      if (stockSymbols.length === 0) return

      try {
        const response = await getCurrentQuotes(stockSymbols)
        const quotes = simplifyQuotes(response.data)

        console.log('New quotes', quotes)
        socket.emit('quotes', quotes)
      } catch (error) {
        console.log('Quotes error', error)
      }
    }, INQUIRY_INTERVAL)

    socket.on('symbols', symbols => {
      stockSymbols = symbols
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
      clearInterval(interval)
    })
  })
}

module.exports = socket
