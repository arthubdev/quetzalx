import {
  setMarketQuote,
} from '../arbitrage/state'

export function startBybitFeed() {
  const ws =
    new WebSocket(
      'wss://stream.bybit.com/v5/public/spot',
    )

  ws.onopen = () => {
    console.log(
      '✅ Bybit connected',
    )

    ws.send(
      JSON.stringify({
        op: 'subscribe',
        args: [
          'tickers.BTCUSDT',
        ],
      }),
    )
  }

  ws.onmessage = (
    event,
  ) => {
    const data =
      JSON.parse(
        event.data.toString(),
      )

    const ticker =
      data.data

    if (!ticker) {
      return
    }

    setMarketQuote({
      exchangeCode:
        'bybit',

      bid:
        Number(
          ticker.bid1Price,
        ),

      ask:
        Number(
          ticker.ask1Price,
        ),

      timestamp:
        new Date().toISOString(),
    })
  }
}