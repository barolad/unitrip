import { createRoute, z } from "@hono/zod-openapi";
import { EventSchema } from "./schema";
import type { AppRouteHandler } from "@/lib/types";
import { db, events, eq } from "@unitrip/db";
import { HTTPException } from "hono/http-exception";

export const getEventRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["events"],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: EventSchema,
        },
      },
      description: "Получить событие",
    },
  },
});

export const getEventHandler: AppRouteHandler<typeof getEventRoute> = async (
  c,
) => {
  const { id } = c.req.valid("param");
  const _event = await db.query.events.findFirst({
    where: eq(events.id, id),
  });

  if (!_event) {
    throw new HTTPException(404, { message: "Мероприятие не найдено" });
  }

  const event = EventSchema.parse(_event);

  return c.json(event);
};
