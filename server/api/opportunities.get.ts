import { db } from '../db'

import { opportunities }
from '../db/schema/opportunities'

import { exchanges }
from '../db/schema/exchanges'

export default defineEventHandler(
  async () => {
    const exchangesData =
      await db
        .select()
        .from(
          exchanges,
        )

    const exchangeMap =
      new Map(
        exchangesData.map(
          (
            exchange,
          ) => [
            exchange.id,
            exchange.name,
          ],
        ),
      )

    const rows =
      await db
        .select()
        .from(
          opportunities,
        )

    const data =
      rows.map(
        (
          opportunity,
        ) => ({
          ...opportunity,

          buyExchange:
            exchangeMap.get(
              opportunity.buyExchangeId,
            ) ??
            'Unknown',

          sellExchange:
            exchangeMap.get(
              opportunity.sellExchangeId,
            ) ??
            'Unknown',

          profitable:
            Number(
              opportunity.estimatedProfit,
            ) > 0,
        }),
      )

    return {
      success: true,

      count:
        data.length,

      data,
    }
  },
)