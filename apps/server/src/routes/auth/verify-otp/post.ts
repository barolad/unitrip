import { createRoute, z } from "@hono/zod-openapi";
import { authApi } from "../";
import { verifyOtp, ERROR_MESSAGES } from "../otp";
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
      content: {
        "application/json": {
          schema: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
            user: z.object({
              id: z.string(),
              email: z.string(),
            }),
          }),
        },
      },
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

export const registerVerifyOtp = (api: typeof authApi) => {
  return api.openapi(verifyOtpRoute, async (c) => {
    const { email, code } = await c.req.json();

    try {
      const isValid = await verifyOtp(email, code);

      if (!isValid) {
        return c.json(
          {
            success: false,
            message: "Неверный код подтверждения",
          },
          401,
        );
      }

      const { accessToken, refreshToken } = await generateTokens(email);

      return c.json({
        accessToken,
        refreshToken,
        user: {
          id: "user_id", // TODO: Получить ID из базы данных
          email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === ERROR_MESSAGES.MAX_ATTEMPTS_EXCEEDED) {
          return c.json(
            {
              success: false,
              message: error.message,
            },
            429,
          );
        }

        if (error.message === ERROR_MESSAGES.OTP_EXPIRED) {
          return c.json(
            {
              success: false,
              message: error.message,
            },
            401,
          );
        }
      }
      throw error;
    }
  });
};
