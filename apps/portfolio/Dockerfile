FROM node:20-alpine AS base

FROM base AS builder

RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune portfolio --docker

FROM base AS installer

RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full .
RUN pnpm build

FROM base AS runner

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/portfolio/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/portfolio/.next/static ./apps/portfolio/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/portfolio/public ./apps/portfolio/public

EXPOSE 3000

CMD ["node", "apps/portfolio/server.js"]
