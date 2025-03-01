import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { db } from '@unitrip/db';
import { organizer } from '@unitrip/db/src/schema';
import { OrganizerSchema } from './schema';

const getAllRoute = createRoute({
  method: 'get',
  tags: ['organizers'],
  path: '/',
  request: {},
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(OrganizerSchema)
        }
      },
      description: 'Organizers retrieved successfully'
    }
  }
});

export const getAllHandler = new OpenAPIHono().openapi(getAllRoute, async (c) => {
  const _organizers = await db.select().from(organizer);

  const organizers = OrganizerSchema.array().parse(_organizers);

  return c.json(organizers, 200);
});
