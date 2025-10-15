import {
  boolean,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 500 }).array(),
  date: timestamp("date").notNull(),
  startCoordinates: varchar("start_coordinates", { length: 255 }),
  endCoordinates: varchar("end_coordinates", { length: 255 }),
  routeLink: varchar("route_link", { length: 500 }),
  difficulty: smallint("difficulty").default(1).notNull(),
  isPaid: boolean("is_paid").default(false),
  sourceLink: varchar("source_link", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
