import { db, users } from "@unitrip/db";
import { count } from "drizzle-orm";

export async function generateUsername() {
  const [{ value: userCount }] = await db
    .select({ value: count() })
    .from(users);
  const paddedCount = (userCount + 1).toString().padStart(8, "0");
  return `user${paddedCount}`;
}
