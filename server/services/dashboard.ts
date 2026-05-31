import { desc } from 'drizzle-orm'

import { getMetrics } from './metrics'

import { db } from '../db'

import { trades } from '../db/schema/trades'

import { wallets } from '../db/schema/wallets'

import { systemEvents } from '../db/schema/system-events'

import { metricsSnapshots } from '../db/schema/metrics-snapshots'

export async function getDashboard() {
  const [
    metrics,
    history,
    recentTrades,
    walletData,
    events,
  ] = await Promise.all([
    getMetrics(),

    db
      .select()
      .from(
        metricsSnapshots,
      )
      .orderBy(
        desc(
          metricsSnapshots.createdAt,
        ),
      )
      .limit(50),

    db
      .select()
      .from(trades)
      .orderBy(
        desc(
          trades.executedAt,
        ),
      )
      .limit(10),

    db
      .select()
      .from(wallets),

    db
      .select()
      .from(systemEvents)
      .orderBy(
        desc(
          systemEvents.createdAt,
        ),
      )
      .limit(10),
  ])

  return {
    metrics,

    history,

    trades:
      recentTrades,

    wallets:
      walletData,

    events,
  }
}