import { createRoute, z } from "@hono/zod-openapi";
import { EventSchema } from "./schema";
import type { AppRouteHandler } from "@/lib/types";
import { db, events, eq } from "@unitrip/db";
import { HTTPException } from "hono/http-exception";

export const putEventRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["events"],
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: EventSchema.omit({
            id: true,
            createdAt: true,
            updatedAt: true,
          }).partial(),
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
      description: "Обновить событие",
    },
  },
});

export const putEventHandler: AppRouteHandler<typeof putEventRoute> = async (
  c,
) => {
  const { id } = c.req.valid("param");
  const payload = c.req.valid("json");
  const [_event] = await db
    .update(events)
    .set(payload)
    .where(eq(events.id, id))
    .returning();

  if (!_event) {
    throw new HTTPException(404, { message: "Мероприятие не найдено" });
  }

  const event = EventSchema.parse(_event);

  return c.json(event);
};
