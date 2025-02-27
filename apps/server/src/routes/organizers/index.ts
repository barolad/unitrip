import { OpenAPIHono } from '@hono/zod-openapi';
import { registerGetAllOrganizers } from './get-all';
import { registerPostOrganizer } from './post';

export const organizersApi = new OpenAPIHono();

registerGetAllOrganizers(organizersApi);
registerPostOrganizer(organizersApi);
