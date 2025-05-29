import type { authApi } from "../";
import { createRoute, z } from "@hono/zod-openapi";
import { db, users } from "@unitrip/db";
import { eq } from "drizzle-orm";
import { setCookie } from "hono/cookie";
import { ApiError } from "@/utils/errors";
import { verifyOtp } from "../otp";
import { generateUsername } from "./generateUsername";
import { generateTokens } from "./tokens";

const verifyOtpSchema = z.object({
  email: z.string().email().openapi({
    description: "Email пользователя",
    example: "test@example.com",
  }),
  code: z.string().length(6).openapi({
    description: "OTP код",
  }),
});

const verifyOtpRoute = createRoute({
  tags: ["auth"],
  method: "post",
  path: "/verify-otp",
  request: {
    body: {
      content: {
        "application/json": {
          schema: verifyOtpSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "OTP код успешно проверен",
    },
    400: {
      description: "Неверный код или формат данных",
    },
    401: {
      description: "Неверный OTP код",
    },
    429: {
      description: "Превышено количество попыток",
    },
  },
});

export function registerVerifyOtp(api: typeof authApi) {
  return api.openapi(verifyOtpRoute, async (c) => {
    const { email, code } = c.req.valid("json");

    const isValid = await verifyOtp(email, code);

    if (!isValid) {
      throw new ApiError({
        code: "UNAUTHORIZED",
        message: "Неверный код подтверждения",
      });
    }

    const _user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!_user) {
      const username = await generateUsername();
      await db.insert(users).values({
        email,
        username,
        firstName: "",
        lastName: "",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(email);
    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 дней
    });
    setCookie(c, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 дней
    });

    return c.json(null, 200);
  });
}
