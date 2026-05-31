import { db } from '../db'
import { exchanges } from '../db/schema/exchanges'

export default defineEventHandler(async () => {
  const data = await db.select().from(exchanges)

  return {
    success: true,
    count: data.length,
    data,
  }
})