import { db } from '../db'
import { systemEvents } from '../db/schema/system-events'

export default defineEventHandler(async () => {
  const data = await db.select().from(systemEvents)

  return {
    success: true,
    count: data.length,
    data,
  }
})