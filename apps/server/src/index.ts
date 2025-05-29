import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { authApi } from "@/routes/auth";
import { profileApi } from "@/routes/profile";
import { Scalar } from "@scalar/hono-api-reference";

const app = new OpenAPIHono().basePath("/api");

/**
 * Uses
 */
app.use("*", cors());

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
