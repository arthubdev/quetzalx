import { db } from '../db'
import { trades } from '../db/schema/trades'

export default defineEventHandler(async () => {
  const data = await db.select().from(trades)

  return {
    success: true,
    count: data.length,
    data,
  }
})