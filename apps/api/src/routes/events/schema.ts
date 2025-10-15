import { z } from "@hono/zod-openapi";

export const EventSchema = z.object({
  date: z.date(),
  id: z.string(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  imageUrl: z.array(z.string()).optional(),
  startCoordinates: z.string().optional(),
  endCoordinates: z.string().optional(),
  routeLink: z.string().optional(),
  difficulty: z.number().optional(),
  isPaid: z.boolean().optional(),
  sourceLink: z.string().optional(),
  description: z.string(),
});
