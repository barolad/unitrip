import type { Config } from 'drizzle-kit';
import { env } from './src/env';

export default {
  schema: './src/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  strict: true,
  dialect: 'postgresql'
} satisfies Config;
