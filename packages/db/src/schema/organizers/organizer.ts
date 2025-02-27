import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { event } from '../events';

export const organizer = pgTable('organizer', {
  id: uuid('id').primaryKey(),
  username: text('username').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  editedAt: timestamp('edited_at').notNull().defaultNow()
});

export const organizerRelation = relations(organizer, ({ many }) => ({
  events: many(event)
}));
