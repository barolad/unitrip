import { OpenAPIHono } from '@hono/zod-openapi';
import { registerGetAllEvents } from './get-all';
import { registerPostEvent } from './post';

export const eventsApi = new OpenAPIHono();

registerGetAllEvents(eventsApi);
registerPostEvent(eventsApi);
