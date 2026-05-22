FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

RUN npm ci --workspace=@portfolio/shared --workspace=@portfolio/api --include-workspace-root 2>/dev/null || npm install

COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

RUN npm run build -w @portfolio/shared
RUN npm run db:generate -w @portfolio/api
RUN npm run build -w @portfolio/api

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/package.json ./

EXPOSE 3001

CMD ["sh", "-c", "cd apps/api && npx prisma db push && npx ts-node prisma/seed.ts && node dist/main.js"]
