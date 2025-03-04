import type { AppType } from '@unitrip/server/src';
import { hc } from 'hono/client';

const { api } = hc<AppType>('/');

export { api };
