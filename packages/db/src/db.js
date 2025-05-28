import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
const connectionString = String(process.env.DATABASE_URL);
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
//# sourceMappingURL=db.js.map