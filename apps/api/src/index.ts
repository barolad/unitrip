import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { configureDocs } from "@/lib/configureDocs";
import { routes } from "./routes";

const app = new OpenAPIHono().basePath("/api");

routes.forEach((route) => {
  app.route("/", route);
});

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
