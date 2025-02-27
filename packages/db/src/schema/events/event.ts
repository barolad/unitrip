import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { organizer } from '../organizers';

export const event = pgTable('event', {
  id: uuid('id').primaryKey(),
  url: text('url').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  body: text('body').notNull().default(''),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  editedAt: timestamp('edited_at').notNull().defaultNow(),
  organizerId: uuid('organizer_id')
    .notNull()
    .references(() => organizer.id)
});

export const eventRelation = relations(event, ({ one }) => ({
  organizer: one(organizer, {
    fields: [event.organizerId],
    references: [organizer.id]
  })
}));
