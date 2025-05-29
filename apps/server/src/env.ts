import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        JWT_SECRET: z.string(),
        REDIS_URL: z.string(),
        PORT: z.number().default(3000),
        DATABASE_URL: z.string(),
    },
    runtimeEnv: process.env,
    skipValidation: true,
})