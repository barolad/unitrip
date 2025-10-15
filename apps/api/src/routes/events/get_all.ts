import type { AppRouteHandler } from "@/lib/types";
import { createRoute, z } from "@hono/zod-openapi";
import {
  db,
  events as eventsTable,
  and,
  gte,
  lte,
  eq,
  like,
  desc,
  count,
} from "@unitrip/db";
import { EventSchema } from "./schema";
import { createPaginationResponseSchema } from "@/lib/pagination";

const GetAllEventsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  difficulty: z.coerce.number().min(1).max(5).optional(),
  isPaid: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

export const getAllEventsRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["events"],
  request: {
    query: GetAllEventsQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: createPaginationResponseSchema(EventSchema),
        },
      },
      description: "Получить все события",
    },
  },
});

export const getAllEventsHandler: AppRouteHandler<
  typeof getAllEventsRoute
> = async (c) => {
  const query = c.req.valid("query");
  const { page, limit, startDate, endDate, difficulty, isPaid, search } = query;
  const offset = (page - 1) * limit;
  const whereConditions = [];

  if (startDate) {
    whereConditions.push(gte(eventsTable.date, startDate));
  }

  if (endDate) {
    whereConditions.push(lte(eventsTable.date, endDate));
  }

  if (difficulty !== undefined) {
    whereConditions.push(eq(eventsTable.difficulty, difficulty));
  }

  if (isPaid !== undefined) {
    whereConditions.push(eq(eventsTable.isPaid, isPaid));
  }

  if (search) {
    whereConditions.push(like(eventsTable.title, `%${search}%`));
  }

  const totalQuery = await db
    .select({ count: count(eventsTable.id) })
    .from(eventsTable)
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

  const total = totalQuery[0]?.count || 0;

  const _events = await db
    .select()
    .from(eventsTable)
    .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
    .orderBy(desc(eventsTable.date))
    .limit(limit)
    .offset(offset);
  const events = EventSchema.array().parse(_events);

  const totalPages = Math.ceil(total / limit);

  return c.json(
    {
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    },
    200,
  );
};
