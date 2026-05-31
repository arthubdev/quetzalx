import { db } from '../db'
import { exchanges } from '../db/schema/exchanges'
import { wallets } from '../db/schema/wallets'

export default defineEventHandler(async () => {
  const allExchanges = await db.select().from(exchanges)

  if (!allExchanges.length) {
    return {
      success: false,
      message: 'No exchanges found. Run /api/seed first.',
    }
  }

  const rows = allExchanges.map((exchange) => ({
    exchangeId: exchange.id,
    btcBalance: '0.00000000',
    usdtBalance: '100000.00',
  }))

  await db.insert(wallets).values(rows).onConflictDoNothing()

  return {
    success: true,
    message: 'Wallets seeded successfully',
  }
})