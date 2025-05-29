import { OpenAPIHono } from "@hono/zod-openapi";
import { handleZodError } from "@/utils/errors";

export function createApi() {
  return new OpenAPIHono({
    defaultHook: handleZodError,
  });
}
