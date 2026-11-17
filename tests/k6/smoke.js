import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 usuários virtuais
  duration: '15s',
  thresholds: {
    http_req_duration: ['p(95)<200'], // SLO: 95% abaixo de 200ms
  },
};

export default function () {
  // Batendo na rota de listagem de livros
  const res = http.get('http://localhost:3000/livros');
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
  sleep(1);
}