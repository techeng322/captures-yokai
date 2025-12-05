FROM node:20-alpine AS base

# Install pnpm standalone binary (bypasses npm registry)
RUN apk add --no-cache curl && \
    curl -fsSL https://github.com/pnpm/pnpm/releases/download/v9.0.0/pnpm-linuxstatic-x64 -o /usr/local/bin/pnpm && \
    chmod +x /usr/local/bin/pnpm && \
    apk del curl

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Configure pnpm with retry logic and network settings
RUN pnpm config set fetch-retries 5 && \
    pnpm config set fetch-retry-factor 10 && \
    pnpm config set fetch-retry-mintimeout 10000 && \
    pnpm config set fetch-retry-maxtimeout 60000

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --network-concurrency 1

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

