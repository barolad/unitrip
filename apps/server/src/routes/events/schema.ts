import { z } from '@hono/zod-openapi';

export const EventSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
  createdAt: z.date(),
  editedAt: z.date(),
  organizerId: z.string().uuid()
});
