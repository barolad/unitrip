import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1)
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL
  },
  skipValidation: true
});
