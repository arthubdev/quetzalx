import {
  pgTable,
  uuid,
  numeric,
  timestamp,
  varchar,
  index,
} from 'drizzle-orm/pg-core'

import { exchanges } from './exchanges'

export const opportunities = pgTable(
  'opportunities',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    buyExchangeId: uuid('buy_exchange_id')
      .references(() => exchanges.id)
      .notNull(),

    sellExchangeId: uuid('sell_exchange_id')
      .references(() => exchanges.id)
      .notNull(),

    buyPrice: numeric('buy_price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    sellPrice: numeric('sell_price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    spread: numeric('spread', {
      precision: 20,
      scale: 2,
    }).notNull(),

    estimatedProfit: numeric('estimated_profit', {
      precision: 20,
      scale: 2,
    }).notNull(),

    volumeBtc: numeric('volume_btc', {
      precision: 20,
      scale: 8,
    }).notNull(),

    score: numeric('score', {
      precision: 10,
      scale: 4,
    }).notNull(),

    status: varchar('status', { length: 20 })
      .notNull()
      .default('detected'),

    detectedAt: timestamp('detected_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    buyExchangeIdx: index('idx_opportunities_buy_exchange_id').on(table.buyExchangeId),
    sellExchangeIdx: index('idx_opportunities_sell_exchange_id').on(table.sellExchangeId),
    statusIdx: index('idx_opportunities_status').on(table.status),
    scoreIdx: index('idx_opportunities_score').on(table.score),
    detectedIdx: index('idx_opportunities_detected_at').on(table.detectedAt),
  }),
)