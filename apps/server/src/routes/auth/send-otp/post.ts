import { createRoute, z } from "@hono/zod-openapi";
import { authApi } from "../";
import { generateAndStoreOtp, isOtpValid } from "./otp";

const sendOtpSchema = z.object({
  email: z.string().email(),
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
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: "Неверный формат email",
    },
    429: {
      description: "Слишком много запросов",
    },
  },
});

export const registerSendOtp = (api: typeof authApi) => {
  return api.openapi(sendOtpRoute, async (c) => {
    const { email } = await c.req.json();

    const isValid = await isOtpValid(email);
    if (isValid) {
      return c.json({
        success: false,
        message: "Код подтверждения уже отправлен. Подождите 5 минут.",
      }, 429);
    }

    const otp = await generateAndStoreOtp(email);
    
    // Для дебага выводим код в консоль
    console.log(`OTP код для ${email}: ${otp}`);
    
    return c.json({
      success: true,
      message: "Код подтверждения отправлен",
    });
  });
}; 