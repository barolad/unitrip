import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { configureDocs } from "@/lib/configureDocs";
import { eventsRouter } from "@/routes/events";

export const app = new OpenAPIHono()
  .basePath("/api")
  .route("/events", eventsRouter);

configureDocs(app);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
