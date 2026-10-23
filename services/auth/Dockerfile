# Build context: services/ (see compose.yaml).
FROM node:24-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.34.7 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY shared ./shared
COPY auth ./auth
RUN pnpm install --frozen-lockfile
RUN pnpm -r --filter "@retcon/auth..." build
RUN pnpm --filter "@retcon/auth" deploy --prod /out

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production SERVICE=auth AUTH_PORT=3001
WORKDIR /app
COPY --from=build --chown=node:node /out ./
COPY --chown=node:node scripts/healthcheck.mjs ./healthcheck.mjs
USER node
EXPOSE 3001
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 CMD ["node", "healthcheck.mjs"]
CMD ["node", "--enable-source-maps", "dist/main.js"]
