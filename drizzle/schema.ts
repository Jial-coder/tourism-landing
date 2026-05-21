import { pgTable, uuid, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  locale: text('locale').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  country: text('country'),
  travelDates: text('travel_dates').notNull(),
  duration: integer('duration').notNull(),
  partySize: integer('party_size').notNull(),
  interests: jsonb('interests').$type<string[]>(),
  budgetRange: text('budget_range'),
  preferredContact: text('preferred_contact').notNull(),
  message: text('message'),
  sourcePath: text('source_path').notNull(),
  ipHash: text('ip_hash'),
  userAgent: text('user_agent'),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
