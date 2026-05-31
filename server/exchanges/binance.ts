import {
  setMarketQuote,
} from '../arbitrage/state'

export function startBinanceFeed() {
  const ws = new WebSocket(
    'wss://stream.binance.com:9443/ws/btcusdt@bookTicker',
  )

  ws.onopen = () => {
    console.log(
      '✅ Binance connected',
    )
  }

  ws.onmessage = (
    event,
  ) => {
    const data =
      JSON.parse(
        event.data.toString(),
      )

    setMarketQuote({
      exchangeCode:
        'binance',

      bid: Number(
        data.b,
      ),

      ask: Number(
        data.a,
      ),

      timestamp:
        new Date().toISOString(),
    })
  }

  ws.onerror = (
    error,
  ) => {
    console.error(
      'Binance error',
      error,
    )
  }

  ws.onclose = () => {
    console.log(
      'Binance disconnected',
    )

    setTimeout(
      startBinanceFeed,
      5000,
    )
  }
}