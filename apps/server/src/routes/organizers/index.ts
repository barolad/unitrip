import { OpenAPIHono } from '@hono/zod-openapi';
import { getAllHandler } from './get-all';
import { postHandler } from './post';

export const organizersApi = new OpenAPIHono().route('/', getAllHandler).route('/', postHandler);
export type OrganizersApi = typeof organizersApi; 