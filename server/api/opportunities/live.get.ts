import {
  getMarketQuotes,
} from '../../arbitrage/state'

import {
  detectAllArbitrage,
} from '../../arbitrage/detector'

export default defineEventHandler(
  () => {
    const quotes =
      getMarketQuotes()

    const opportunities =
      detectAllArbitrage(
        quotes,
      )

    return {
      success: true,

      count:
        opportunities.length,

      opportunities,
    }
  },
)