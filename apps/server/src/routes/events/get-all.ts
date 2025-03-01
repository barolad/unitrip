import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { db } from '@unitrip/db';
import { event } from '@unitrip/db/src/schema';
import { EventSchema } from './schema';

const getAllRoute = createRoute({
  method: 'get',
  tags: ['events'],
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(EventSchema)
        }
      },
      description: 'Events retrieved successfully'
    }
  }
});

export const getAllHandler = new OpenAPIHono().openapi(getAllRoute, async (c) => {
  const _events = await db.select().from(event);

  const events = EventSchema.array().parse(_events);

  return c.json(events, 200);
});
