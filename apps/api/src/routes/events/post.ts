import { createRoute } from "@hono/zod-openapi";
import { EventSchema } from "./schema";
import { db, events } from "@unitrip/db";
import type { AppRouteHandler } from "@/lib/types";
import { authMiddleware } from "@/middlewares";

export const postEventRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["events"],
  middleware: [authMiddleware],
  request: {
    body: {
      content: {
        "application/json": {
          schema: EventSchema.omit({
            id: true,
            createdAt: true,
            updatedAt: true,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EventSchema,
        },
      },
      description: "Создать событие",
    },
  },
});

export const postEventHandler: AppRouteHandler<typeof postEventRoute> = async (
  c,
) => {
  const event = c.req.valid("json");
  const [_event] = await db.insert(events).values(event).returning();
  const newEvent = EventSchema.parse(_event);

  return c.json(newEvent, 200);
};
