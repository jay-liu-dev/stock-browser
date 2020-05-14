import { useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'

const SOCKET_ENDPOINT = 'http://localhost:3001'

const useRealTimeQuotes = onQuotesUpdate => {
  const socket = useRef()

  useEffect(() => {
    socket.current = socketIOClient(SOCKET_ENDPOINT)

    socket.current.on('quotes', quotes => {
      console.log('New quotes', quotes)
      onQuotesUpdate(quotes)
    })
  }, [])

  const watchStocks = stocks => {
    if (socket.current) {
      socket.current.emit(
        'symbols',
        stocks.map(stock => stock.symbol),
      )
    }
  }

  return {
    watchStocks,
  }
}

export default useRealTimeQuotes
