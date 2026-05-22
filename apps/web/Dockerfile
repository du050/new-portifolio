FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL=http://localhost:3001/api
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/

RUN npm ci --workspace=@portfolio/shared --workspace=@portfolio/web --include-workspace-root 2>/dev/null || npm install

COPY packages/shared ./packages/shared
COPY apps/web ./apps/web

RUN npm run build -w @portfolio/shared
RUN npm run build -w @portfolio/web

FROM nginx:alpine AS runner

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
