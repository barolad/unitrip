import { OpenAPIHono } from "@hono/zod-openapi";
import { registerGetProfile } from "./get";

export const profileApi = new OpenAPIHono();

registerGetProfile(profileApi);
