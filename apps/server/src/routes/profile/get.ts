import { createRoute } from "@hono/zod-openapi";
import { profileApi } from ".";

const getRoute = createRoute({
  tags: ["profile"],
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Получить профиль пользователя",
    },
  },
});

export const registerGetProfile = (api: typeof profileApi) => {
  return api.openapi(getRoute, async (c) => {
    return c.json({
      id: "1",
      name: "John Doe",
    });
  });
};
