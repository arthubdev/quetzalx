import {
  getMarketQuotes,
} from '../../arbitrage/state'

import {
  detectBestArbitrage,
} from '../../arbitrage/detector'

import {
  saveOpportunity,
} from '../../simulator/execution'

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

    const saved =
      await saveOpportunity(
        opportunity,
      )

    return {
      success: true,
      opportunity:
        saved,
    }
  },
)