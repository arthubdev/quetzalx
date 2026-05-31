import {
  setMarketQuote,
} from '../arbitrage/state'

export function startOkxFeed() {
  const ws =
    new WebSocket(
      'wss://ws.okx.com:8443/ws/v5/public',
    )

  ws.onopen = () => {
    console.log(
      '✅ OKX connected',
    )

    ws.send(
      JSON.stringify({
        op: 'subscribe',
        args: [
          {
            channel:
              'tickers',
            instId:
              'BTC-USDT',
          },
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
      data.data?.[0]

    if (!ticker) {
      return
    }

    setMarketQuote({
      exchangeCode:
        'okx',

      bid:
        Number(
          ticker.bidPx,
        ),

      ask:
        Number(
          ticker.askPx,
        ),

      timestamp:
        new Date().toISOString(),
    })
  }
}