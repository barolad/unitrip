import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
export const communities = pgTable("communities", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull().unique(),
    name: text("name").notNull(),
    creatorId: uuid("creator_id")
        .notNull()
        .references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
//# sourceMappingURL=communities.js.map