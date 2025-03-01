import { OpenAPIHono } from '@hono/zod-openapi';
import { getAllHandler } from './get-all';
import { postHandler } from './post';

export const eventsApi = new OpenAPIHono().route('/', getAllHandler).route('/', postHandler);
