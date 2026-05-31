import {
  setMarketQuote,
} from '../arbitrage/state'

export function startKrakenFeed() {
  const ws =
    new WebSocket(
      'wss://ws.kraken.com/v2',
    )

  ws.onopen = () => {
    console.log(
      '✅ Kraken connected',
    )

    ws.send(
      JSON.stringify({
        method:
          'subscribe',

        params: {
          channel:
            'ticker',

          symbol: [
            'BTC/USD',
          ],
        },
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
      data.channel !==
      'ticker'
    ) {
      return
    }

    const ticker =
      data.data?.[0]

    if (!ticker) {
      return
    }

    setMarketQuote({
      exchangeCode:
        'kraken',

      bid: Number(
        ticker.bid,
      ),

      ask: Number(
        ticker.ask,
      ),

      timestamp:
        new Date().toISOString(),
    })
  }

  ws.onerror = (
    error,
  ) => {
    console.error(
      'Kraken error',
      error,
    )
  }

  ws.onclose = () => {
    console.log(
      'Kraken disconnected',
    )

    setTimeout(
      startKrakenFeed,
      5000,
    )
  }
}