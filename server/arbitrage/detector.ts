import type {
  ArbitrageOpportunity,
  MarketQuote,
} from './types'

import {
  calculateOpportunity,
} from './calculator'

export function detectBestArbitrage(
  quotes: MarketQuote[],
): ArbitrageOpportunity | null {
  if (
    quotes.length < 2
  ) {
    return null
  }

  let bestOpportunity:
    | ArbitrageOpportunity
    | null = null

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
        const opportunity =
          calculateOpportunity(
            buy,
            sell,
          )

        if (
          opportunity.netProfit >
          0
        ) {
          if (
            !bestOpportunity
          ) {
            bestOpportunity =
              opportunity

            continue
          }

          if (
            opportunity.netProfit >
            bestOpportunity.netProfit
          ) {
            bestOpportunity =
              opportunity
          }
        }
      }
    }
  }

  return bestOpportunity
}

export function detectAllArbitrage(
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
        !buy.ask ||
        !sell.bid
      ) {
        continue
      }

      const opportunity =
        calculateOpportunity(
          buy,
          sell,
        )

      opportunities.push(
        opportunity,
      )
    }
  }

  return opportunities.sort(
    (
      a,
      b,
    ) =>
      b.netProfit -
      a.netProfit,
  )
}