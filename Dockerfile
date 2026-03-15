FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# dependencies cache
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm fetch --frozen-lockfile

# development
FROM base AS dev
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml ./
COPY --from=deps /root/.local/share/pnpm/store /root/.local/share/pnpm/store
RUN pnpm config set store-dir /root/.local/share/pnpm/store && \
    pnpm install --frozen-lockfile --offline
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# build
FROM base AS build
ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml ./
COPY --from=deps /root/.local/share/pnpm/store /root/.local/share/pnpm/store
RUN pnpm config set store-dir /root/.local/share/pnpm/store && \
    pnpm install --frozen-lockfile --offline

COPY . .
RUN pnpm build

# production runtime
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
