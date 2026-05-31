import {
  getMarketQuotes,
} from '../../arbitrage/state'

import {
  analyzeMarket,
} from '../../arbitrage/analyzer'

export default defineEventHandler(
  () => {
    const quotes =
      getMarketQuotes()

    const opportunities =
      analyzeMarket(
        quotes,
      )

    return {
      success: true,

      totalQuotes:
        quotes.length,

      opportunities,
    }
  },
)