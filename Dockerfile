# Estágio 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Gera o Prisma e compila
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate
RUN npm run build

# Estágio 2: Execução
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# A MÁGICA ACONTECE AQUI:
# Copia TUDO do estágio anterior para a pasta /app, em vez de apenas a pasta dist
COPY --from=builder /app . 

EXPOSE 3000
CMD ["node", "dist/main.js"]