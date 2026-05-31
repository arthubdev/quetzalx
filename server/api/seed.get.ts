import { db } from '../db'
import { exchanges } from '../db/schema/exchanges'

export default defineEventHandler(async () => {
  await db
    .insert(exchanges)
    .values([
      {
        code: 'binance',
        name: 'Binance',
      },
      {
        code: 'kraken',
        name: 'Kraken',
      },
      {
        code: 'coinbase',
        name: 'Coinbase',
      },
      {
        code: 'okx',
        name: 'OKX',
      },
      {
        code: 'bybit',
        name: 'Bybit',
      },
    ])
    .onConflictDoNothing()

  return {
    success: true,
    message: 'Exchanges seeded successfully',
  }
})