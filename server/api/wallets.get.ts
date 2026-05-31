import { db } from '../db'
import { wallets } from '../db/schema/wallets'

export default defineEventHandler(async () => {
  const data = await db.select().from(wallets)

  return {
    success: true,
    count: data.length,
    data,
  }
})