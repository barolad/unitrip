import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { env } from "@/env";
import { ApiError } from "../errors";

export async function authMiddleware(c: Context, next: Next) {
  const authToken = getCookie(c, "accessToken");

  if (!authToken) {
    throw new ApiError({
      code: "UNAUTHORIZED",
      message: "Токен не найден",
    });
  }

  let decoded
  try {
    decoded = await verify(authToken, env.JWT_SECRET);
  } catch  {
    throw new ApiError({
      code: "UNAUTHORIZED",
      message: "Неверный токен",
    });
  }

  if (!decoded) {
    throw new ApiError({
      code: "UNAUTHORIZED",
      message: "Неверный токен",
    });
  }

  c.set("user", decoded);

  await next();
}