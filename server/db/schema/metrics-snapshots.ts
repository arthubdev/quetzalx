import {
  pgTable,
  uuid,
  numeric,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'

export const metricsSnapshots = pgTable(
  'metrics_snapshots',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    totalProfit: numeric('total_profit', {
      precision: 20,
      scale: 2,
    })
      .notNull()
      .default('0'),

    totalTrades: integer('total_trades')
      .notNull()
      .default(0),

    totalOpportunities: integer('total_opportunities')
      .notNull()
      .default(0),

    winRate: numeric('win_rate', {
      precision: 5,
      scale: 2,
    })
      .notNull()
      .default('0'),

    avgLatencyMs: integer('avg_latency_ms')
      .notNull()
      .default(0),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    createdIdx: index('idx_metrics_snapshots_created_at').on(table.createdAt),
  }),
)