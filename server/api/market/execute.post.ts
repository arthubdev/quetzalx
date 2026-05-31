import {
  getMarketQuotes,
} from '../../arbitrage/state'

import {
  detectBestArbitrage,
} from '../../arbitrage/detector'

import {
  executeTrade,
} from '../../simulator/execute-trade'

export default defineEventHandler(
  async () => {
    const quotes =
      getMarketQuotes()

    const opportunity =
      detectBestArbitrage(
        quotes,
      )

    if (
      !opportunity
    ) {
      return {
        success: false,
        message:
          'No opportunity found',
      }
    }

    const result =
      await executeTrade(
        opportunity,
      )

    return {
      success: true,
      result,
    }
  },
)