import type {
  ArbitrageOpportunity,
  MarketQuote,
} from './types'

import {
  calculateOpportunity,
} from './calculator'

export function analyzeMarket(
  quotes: MarketQuote[],
): ArbitrageOpportunity[] {
  const opportunities:
    ArbitrageOpportunity[] = []

  for (
    const buy of quotes
  ) {
    for (
      const sell of quotes
    ) {
      if (
        buy.exchangeCode ===
        sell.exchangeCode
      ) {
        continue
      }

      if (
        buy.ask <
        sell.bid
      ) {
        const result =
          calculateOpportunity(
            buy,
            sell,
          )

        opportunities.push(
          result,
        )
      }
    }
  }

  return opportunities.sort(
    (a, b) =>
      b.netProfit -
      a.netProfit,
  )
}