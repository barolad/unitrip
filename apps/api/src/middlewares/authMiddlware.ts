import type { Context, MiddlewareHandler, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { validateTelegramInitData } from "@/lib/validateTelegramInitData";

export const authMiddleware: MiddlewareHandler = async (
  c: Context,
  next: Next,
) => {
  const authData = c.req.header("Authorization");

  if (!authData) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  try {
    const isValid = validateTelegramInitData(
      String(process.env.TELEGRAM_BOT_TOKEN),
      authData,
    );

    if (!isValid) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }
    c.set("user", authData);
    await next();
  } catch (error) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
};
