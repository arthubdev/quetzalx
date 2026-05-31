import { db } from '../db'
import { metricsSnapshots } from '../db/schema/metrics-snapshots'

export default defineEventHandler(async () => {
  const data = await db.select().from(metricsSnapshots)

  return {
    success: true,
    count: data.length,
    data,
  }
})