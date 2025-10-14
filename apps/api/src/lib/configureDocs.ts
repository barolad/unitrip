import type { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

export const configureDocs = (app: OpenAPIHono) => {
  app.doc("/openapi", {
    openapi: "3.0.0",
    info: {
      title: "Unitrip API",
      version: "1.0.0",
    },
  });

  app.get(
    "/docs",
    Scalar({
      url: "/api/openapi",
    }),
  );
};
