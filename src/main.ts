import 'dotenv/config';
import { buildApp } from './infrastructure/repositories/http/app.js';

const app = buildApp();

const port = Number(process.env.PORT) || 3000;

app.listen({ port, host: '0.0.0.0' })
  .then(() => app.log.info(`Servidor rodando na porta ${port}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });