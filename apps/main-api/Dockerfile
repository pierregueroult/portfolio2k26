FROM node:20-alpine AS base

FROM base AS builder

RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm turbo
COPY . .
RUN turbo prune main-api --docker

FROM base AS installer

RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm @nestjs/cli
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full .
RUN pnpm build

FROM base AS runner

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

USER nestjs
COPY --from=installer --chown=nestjs:nodejs /app .

EXPOSE 4000

CMD ["node", "apps/main-api/dist/main.js"]
