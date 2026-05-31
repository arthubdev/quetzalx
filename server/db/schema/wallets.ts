import {
  pgTable,
  uuid,
  numeric,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

import { exchanges } from './exchanges'

export const wallets = pgTable(
  'wallets',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    exchangeId: uuid('exchange_id')
      .references(() => exchanges.id)
      .notNull(),

    btcBalance: numeric('btc_balance', {
      precision: 20,
      scale: 8,
    })
      .notNull()
      .default('0'),

    usdtBalance: numeric('usdt_balance', {
      precision: 20,
      scale: 2,
    })
      .notNull()
      .default('0'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    exchangeIdx: index('idx_wallets_exchange_id').on(table.exchangeId),
    exchangeUnique: uniqueIndex('uq_wallets_exchange_id').on(table.exchangeId),
  }),
)