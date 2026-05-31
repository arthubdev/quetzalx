import { eq } from 'drizzle-orm'

import { db } from '../db'

import { exchanges } from '../db/schema/exchanges'
import { opportunities } from '../db/schema/opportunities'

import type {
  ArbitrageOpportunity,
} from '../arbitrage/types'

export async function saveOpportunity(
  opportunity: ArbitrageOpportunity,
) {
  const [buyExchange] =
    await db
      .select()
      .from(exchanges)
      .where(
        eq(
          exchanges.code,
          opportunity.buyExchange,
        ),
      )

  const [sellExchange] =
    await db
      .select()
      .from(exchanges)
      .where(
        eq(
          exchanges.code,
          opportunity.sellExchange,
        ),
      )

  if (
    !buyExchange ||
    !sellExchange
  ) {
    throw new Error(
      'Exchange not found',
    )
  }

  const [saved] =
    await db
      .insert(
        opportunities,
      )
      .values({
        buyExchangeId:
          buyExchange.id,

        sellExchangeId:
          sellExchange.id,

        buyPrice:
          opportunity.buyPrice.toString(),

        sellPrice:
          opportunity.sellPrice.toString(),

        spread:
          opportunity.spread.toString(),

        estimatedProfit:
          opportunity.estimatedProfit.toString(),

        volumeBtc:
          opportunity.volumeBtc.toString(),

        score:
          opportunity.score.toString(),

        status:
          'detected',
      })
      .returning()

  return saved
}