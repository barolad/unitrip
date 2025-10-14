import type { Config } from "drizzle-kit";
import { envVars } from "./src/config";

export default {
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: envVars.DATABASE_URL,
  },
  strict: true,
  dialect: "postgresql",
} satisfies Config;
