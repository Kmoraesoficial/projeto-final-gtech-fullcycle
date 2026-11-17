import Fastify from 'fastify';
import { routes } from './routes.js';

export function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty' } 
        : undefined, 
    },
  });

  
  app.get('/health', async () => ({ status: 'ok' }));
  app.register(routes);

  return app;
}