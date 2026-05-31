import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'

export const exchanges = pgTable(
  'exchanges',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    code: varchar('code', {
      length: 20,
    })
      .unique()
      .notNull(),

    name: varchar('name', {
      length: 100,
    }).notNull(),

    isActive: boolean('is_active')
      .default(true)
      .notNull(),

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
    codeIdx: index(
      'idx_exchanges_code',
    ).on(table.code),
  }),
)