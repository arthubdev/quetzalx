import { eq } from 'drizzle-orm'

import { db } from '../../db'

import { wallets } from '../../db/schema/wallets'

import { exchanges } from '../../db/schema/exchanges'

export default defineEventHandler(
  async () => {
    const data =
      await db
        .select({
          id: wallets.id,

          exchangeId:
            wallets.exchangeId,

          exchangeName:
            exchanges.name,

          exchangeCode:
            exchanges.code,

          btcBalance:
            wallets.btcBalance,

          usdtBalance:
            wallets.usdtBalance,

          updatedAt:
            wallets.updatedAt,
        })
        .from(wallets)
        .innerJoin(
          exchanges,
          eq(
            wallets.exchangeId,
            exchanges.id,
          ),
        )

    return {
      success: true,
      count: data.length,
      data,
    }
  },
)