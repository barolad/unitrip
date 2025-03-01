import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { db } from '@unitrip/db';
import { event } from '@unitrip/db/src/schema';
import { ErrorSchema } from '@utils/error-schema';
import { count, eq } from 'drizzle-orm';
import { EventSchema } from './schema';

const postRoute = createRoute({
  method: 'post',
  tags: ['events'],
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: EventSchema.omit({ id: true, createdAt: true, editedAt: true, organizerId: true })
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: EventSchema
        }
      },
      description: 'Event created successfully'
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema
        }
      },
      description: 'Event already exists'
    }
  }
});

export const postHandler = new OpenAPIHono().openapi(postRoute, async (c) => {
  const input = c.req.valid('json');

  const existingEventCount = (
    await db.select({ count: count() }).from(event).where(eq(event.url, input.url))
  )[0].count;

  if (existingEventCount > 0) {
    return c.json({ error: 'Event already exists' }, 400);
  }

  const [_event] = await db
    .insert(event)
    .values({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      editedAt: new Date(),
      organizerId: '02b563f2-0762-4ab0-a6c2-5a115b6cb0ff',
      ...input
    })
    .returning();

  return c.json(_event, 201);
});
