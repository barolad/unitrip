import { pgTable, uuid, text, timestamp, decimal } from "drizzle-orm/pg-core";
import { communities } from "./communities";
import { categories } from "./categories";
export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startDate: timestamp("start_date").notNull(),
  location: text("location").notNull(),
  latitude: decimal("latitude", { precision: 9, scale: 6 }).notNull(),
  longitude: decimal("longitude", { precision: 9, scale: 6 }).notNull(),
  communityId: uuid("community_id")
    .notNull()
    .references(() => communities.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
//# sourceMappingURL=events.js.map
