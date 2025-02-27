import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { eventsApi } from '@routes/events';
import { organizersApi } from '@routes/organizers';
import { serveEmojiFavicon } from '@utils/serve-emoji-icon';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { requestId } from 'hono/request-id';

const app = new OpenAPIHono().basePath('/api');

app.use('*', requestId());
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', serveEmojiFavicon('🚀'));

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API'
  }
});
app.get(
  '/ui',
  swaggerUI({
    url: '/api/doc'
  })
);

app.route('/events', eventsApi);
app.route('/organizers', organizersApi);

export default {
  port: 3000,
  fetch: app.fetch
};
