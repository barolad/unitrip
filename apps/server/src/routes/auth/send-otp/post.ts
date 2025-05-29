import type { authApi } from "../";
import { createRoute, z } from "@hono/zod-openapi";
import { ApiError } from "@/utils/errors";
import { generateAndStoreOtp, isOtpValid } from "../otp";

const sendOtpSchema = z.object({
  email: z.string().email().openapi({
    description: "Email пользователя",
    example: "test@example.com",
  }),
});

const sendOtpRoute = createRoute({
  tags: ["auth"],
  method: "post",
  path: "/send-otp",
  request: {
    body: {
      content: {
        "application/json": {
          schema: sendOtpSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "OTP код успешно отправлен",
    },
    400: {
      description: "Неверный формат email",
    },
    429: {
      description: "Слишком много запросов",
    },
  },
});

export function registerSendOtp(api: typeof authApi) {
  return api.openapi(sendOtpRoute, async (c) => {
    const { email } = c.req.valid("json");

    const isValid = await isOtpValid(email);
    if (isValid) {
      throw new ApiError({
        code: "TOO_MANY_REQUESTS",
        message: "Код подтверждения уже отправлен. Подождите 5 минут.",
      });
    }

    await generateAndStoreOtp(email);

    return c.json(null, 200);
  });
}
