import { OpenAPIHono } from "@hono/zod-openapi";
import { registerSendOtp } from "./send-otp/post";

export const authApi = new OpenAPIHono();

registerSendOtp(authApi);
// registerVerifyOtp(authApi);