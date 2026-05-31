import { desc } from 'drizzle-orm'

import { db } from '../../db'

import {
  metricsSnapshots,
} from '../../db/schema/metrics-snapshots'

export default defineEventHandler(
  async () => {
    const snapshots =
      await db
        .select()
        .from(
          metricsSnapshots,
        )
        .orderBy(
          desc(
            metricsSnapshots.createdAt,
          ),
        )

    return {
      success: true,
      count:
        snapshots.length,

      data:
        snapshots,
    }
  },
)