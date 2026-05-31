import { sql } from 'drizzle-orm'

import { db } from '../db'

import { trades } from '../db/schema/trades'
import { opportunities } from '../db/schema/opportunities'

export async function getMetrics() {
  const [metrics] =
    await db.execute(sql`
      SELECT
        COUNT(*)::int as total_trades,

        COALESCE(
          SUM(net_profit),
          0
        ) as total_profit,

        COALESCE(
          AVG(net_profit),
          0
        ) as avg_profit,

        COALESCE(
          MAX(net_profit),
          0
        ) as best_trade,

        COALESCE(
          MIN(net_profit),
          0
        ) as worst_trade,

        COALESCE(
          (
            COUNT(
              CASE
                WHEN net_profit > 0
                THEN 1
              END
            )::decimal
            /
            NULLIF(
              COUNT(*),
              0
            )
          ) * 100,
          0
        ) as win_rate

      FROM trades
      WHERE status = 'executed'
    `)

  const [opportunitiesResult] =
    await db.execute(sql`
      SELECT
        COUNT(*)::int as total_opportunities
      FROM opportunities
    `)

  return {
    ...metrics,

    total_opportunities:
      opportunitiesResult
        ?.total_opportunities ??
      0,
  }
}