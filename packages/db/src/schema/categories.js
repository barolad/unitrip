import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
//# sourceMappingURL=categories.js.map