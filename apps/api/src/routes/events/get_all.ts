import type { AppRouteHandler } from "@/lib/types";
import { createRoute, z } from "@hono/zod-openapi";
import { db } from "@unitrip/db";
import { EventSchema } from "./schema";

export const getAllEventsRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(EventSchema),
        },
      },
      description: "Получить все события",
    },
  },
});

export const getAllEventsHandler: AppRouteHandler<
  typeof getAllEventsRoute
> = async (c) => {
  const _events = await db.query.events.findMany();
  const events = EventSchema.array().parse(_events);
  return c.json(events, 200);
};
