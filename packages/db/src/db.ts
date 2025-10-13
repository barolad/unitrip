import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { envVars } from "./config";

const connectionString = envVars.DATABASE_URL;

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
