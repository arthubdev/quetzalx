import {
  pgTable,
  uuid,
  numeric,
  varchar,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'

import { opportunities } from './opportunities'
import { exchanges } from './exchanges'

export const trades = pgTable(
  'trades',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    opportunityId: uuid('opportunity_id')
      .references(() => opportunities.id)
      .notNull(),

    buyExchangeId: uuid('buy_exchange_id')
      .references(() => exchanges.id)
      .notNull(),

    sellExchangeId: uuid('sell_exchange_id')
      .references(() => exchanges.id)
      .notNull(),

    volumeBtc: numeric('volume_btc', {
      precision: 20,
      scale: 8,
    }).notNull(),

    buyPrice: numeric('buy_price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    sellPrice: numeric('sell_price', {
      precision: 20,
      scale: 2,
    }).notNull(),

    grossProfit: numeric('gross_profit', {
      precision: 20,
      scale: 2,
    }).notNull(),

    tradingFees: numeric('trading_fees', {
      precision: 20,
      scale: 2,
    }).notNull(),

    slippageCost: numeric('slippage_cost', {
      precision: 20,
      scale: 2,
    }).notNull(),

    netProfit: numeric('net_profit', {
      precision: 20,
      scale: 2,
    }).notNull(),

    status: varchar('status', { length: 20 })
      .notNull()
      .default('pending'),

    executedAt: timestamp('executed_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    opportunityIdx: index('idx_trades_opportunity_id').on(table.opportunityId),
    statusIdx: index('idx_trades_status').on(table.status),
    executedIdx: index('idx_trades_executed_at').on(table.executedAt),
  }),
)