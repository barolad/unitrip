import type { AppType } from 'server/src';
import { hc } from 'hono/client';

const { api } = hc<AppType>('http://localhost:3000');

export { api };
