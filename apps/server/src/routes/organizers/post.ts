import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { db } from '@unitrip/db';
import { organizer } from '@unitrip/db/src/schema';
import { ErrorSchema } from '@utils/error-schema';
import { count, eq } from 'drizzle-orm';
import { OrganizerSchema } from './schema';

const postRoute = createRoute({
  method: 'post',
  tags: ['organizers'],
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: OrganizerSchema.omit({ id: true, createdAt: true, editedAt: true })
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: OrganizerSchema
        }
      },
      description: 'Organizer created successfully'
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema
        }
      },
      description: 'Organizer already exists'
    }
  }
});

export const postHandler = new OpenAPIHono().openapi(postRoute, async (c) => {
  const input = c.req.valid('json');

  const existingOrganizerCount = (
    await db
      .select({ count: count() })
      .from(organizer)
      .where(eq(organizer.username, input.username))
  )[0].count;

  if (existingOrganizerCount > 0) {
    return c.json({ error: 'Organizer already exists' }, 400);
  }

  const [_organizer] = await db
    .insert(organizer)
    .values({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      editedAt: new Date(),
      ...input
    })
    .returning();

  const data = OrganizerSchema.parse(_organizer);

  return c.json(data, 201);
});
