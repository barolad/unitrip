import type { profileApi } from ".";
import { createRoute } from "@hono/zod-openapi";
import { authMiddleware } from "@/utils/middlewares";

const getRoute = createRoute({
  tags: ["profile"],
  method: "get",
  middleware: [authMiddleware],
  path: "/",
  responses: {
    200: {
      description: "Получить профиль пользователя",
    },
  },
});

export function registerGetProfile(api: typeof profileApi) {
  return api.openapi(getRoute, async (c) => {
    const user = c.get("user");

    return c.json(user);
  });
}
