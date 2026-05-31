import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'

export const systemEvents = pgTable(
  'system_events',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    level: varchar('level', { length: 20 })
      .notNull(), // info | warn | error

    source: varchar('source', { length: 50 })
      .notNull(),

    message: text('message')
      .notNull(),

    payload: jsonb('payload'),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    levelIdx: index('idx_system_events_level').on(table.level),
    sourceIdx: index('idx_system_events_source').on(table.source),
    createdIdx: index('idx_system_events_created_at').on(table.createdAt),
  }),
)