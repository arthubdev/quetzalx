import {
  setMarketQuote,
} from '../arbitrage/state'

export function startCoinbaseFeed() {
  const ws =
    new WebSocket(
      'wss://ws-feed.exchange.coinbase.com',
    )

  ws.onopen = () => {
    console.log(
      '✅ Coinbase connected',
    )

    ws.send(
      JSON.stringify({
        type: 'subscribe',
        product_ids: [
          'BTC-USD',
        ],
        channels: [
          'ticker',
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

    if (
      data.type !==
      'ticker'
    ) {
      return
    }

    setMarketQuote({
      exchangeCode:
        'coinbase',

      bid:
        Number(
          data.best_bid,
        ),

      ask:
        Number(
          data.best_ask,
        ),

      timestamp:
        new Date().toISOString(),
    })
  }
}