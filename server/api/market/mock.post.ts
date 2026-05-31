import {
  setMarketQuote,
  getMarketQuotes,
} from '../../arbitrage/state'

import {
  detectBestArbitrage,
} from '../../arbitrage/detector'

import type {
  ExchangeCode,
  MarketQuote,
} from '../../arbitrage/types'

interface Body {
  exchangeCode: ExchangeCode

  bid: number

  ask: number
}

export default defineEventHandler(
  async (event) => {
    const body =
      await readBody<Body>(
        event,
      )

    const quote: MarketQuote =
      {
        exchangeCode:
          body.exchangeCode,

        bid: body.bid,

        ask: body.ask,

        timestamp:
          new Date().toISOString(),
      }

    setMarketQuote(
      quote,
    )

    const quotes =
      getMarketQuotes()

    const opportunity =
      detectBestArbitrage(
        quotes,
      )

    return {
      success: true,

      quote,

      opportunity,
    }
  },
)