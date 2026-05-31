import {
  desc,
} from 'drizzle-orm'

import { db } from '../db'

import {
  metricsSnapshots,
} from '../db/schema/metrics-snapshots'

import {
  getMetrics,
} from './metrics'

export async function createSnapshot() {
  const metrics =
    await getMetrics()

  const totalTrades =
    Number(
      metrics.total_trades ?? 0,
    )

  const totalProfit =
    Number(
      metrics.total_profit ?? 0,
    )

  const totalOpportunities =
    Number(
      metrics.total_opportunities ?? 0,
    )

  const winRate =
    Number(
      metrics.win_rate ?? 0,
    )

  const avgLatencyMs =
    Number(
      metrics.avg_latency_ms ?? 0,
    )

  const [previous] =
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
      .limit(1)

  const hasChanged =
    !previous
    || Number(
      previous.totalTrades,
    ) !== totalTrades
    || Number(
      previous.totalProfit,
    ) !== totalProfit
    || Number(
      previous.totalOpportunities,
    ) !== totalOpportunities
    || Number(
      previous.winRate,
    ) !== winRate
    || Number(
      previous.avgLatencyMs,
    ) !== avgLatencyMs

  if (!hasChanged) {
    return {
      skipped: true,

      totalTrades,
      totalProfit,
      totalOpportunities,
      winRate,
      avgLatencyMs,
    }
  }

  await db
    .insert(
      metricsSnapshots,
    )
    .values({
      totalTrades,

      totalProfit:
        totalProfit.toString(),

      totalOpportunities,

      winRate:
        winRate.toString(),

      avgLatencyMs,
    })

  return {
    skipped: false,

    totalTrades,
    totalProfit,
    totalOpportunities,
    winRate,
    avgLatencyMs,
  }
}