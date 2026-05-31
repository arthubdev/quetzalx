import {
  detectBestArbitrage,
} from '../arbitrage/detector'

import {
  getMarketQuotes,
} from '../arbitrage/state'

import {
  executeTrade,
} from '../simulator/execute-trade'

import {
  canTrade,
  markTrade,
} from './trade-lock'

let isRunning = false

export async function runAutoTrader() {
  if (isRunning) {
    return
  }

  isRunning = true

  try {
    const quotes =
      getMarketQuotes()

    const opportunity =
      detectBestArbitrage(
        quotes,
      )

    if (!opportunity) {
      return
    }

    if (
      opportunity.netProfit <= 0
    ) {
      return
    }

    if (!canTrade()) {
      return
    }

    console.log(
      '🚀 AUTO TRADE',
      opportunity,
    )

    await executeTrade(
      opportunity,
    )

    markTrade()
  }
  catch (error) {
    console.error(
      'AUTO TRADER ERROR',
      error,
    )
  }
  finally {
    isRunning = false
  }
}