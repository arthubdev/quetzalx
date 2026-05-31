import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'

import { wallets } from './wallets'
import { trades } from './trades'

export const walletTransactions = pgTable(
  'wallet_transactions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    walletId: uuid('wallet_id')
      .references(() => wallets.id)
      .notNull(),

    tradeId: uuid('trade_id')
      .references(() => trades.id),

    asset: varchar('asset', { length: 10 })
      .notNull(), // BTC | USDT

    amount: numeric('amount', {
      precision: 20,
      scale: 8,
    }).notNull(),

    transactionType: varchar('transaction_type', { length: 20 })
      .notNull(), // credit | debit

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    walletIdx: index('idx_wallet_transactions_wallet_id').on(table.walletId),
    tradeIdx: index('idx_wallet_transactions_trade_id').on(table.tradeId),
    createdIdx: index('idx_wallet_transactions_created_at').on(table.createdAt),
  }),
)