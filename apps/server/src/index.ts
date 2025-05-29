import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { authApi } from "@/routes/auth";
import { profileApi } from "@/routes/profile";
import { handleError } from "@/utils/errors";

const app = new OpenAPIHono().basePath("/api");

/**
 * Uses
 */
app.use("*", cors());

app.onError(handleError);

/**
 * Routes
 */
app.route("/profile", profileApi);
app.route("/auth", authApi);

/**
 * Docs
 */
app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    title: "Unitrip docs",
    version: "1.0.0",
  },
});
app.get(
  "/docs",
  Scalar({
    url: "/api/openapi",
  }),
);

export default app;
