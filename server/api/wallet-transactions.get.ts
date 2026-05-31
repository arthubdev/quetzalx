import { db } from '../db'
import { walletTransactions } from '../db/schema/wallet-transactions'

export default defineEventHandler(async () => {
  const data = await db.select().from(walletTransactions)

  return {
    success: true,
    count: data.length,
    data,
  }
})