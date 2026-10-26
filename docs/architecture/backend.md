# My backend setup and configuration

## Layout

```text
infra/nginx.conf
services/
  auth/src/
    config/
    database/
    modules/auth/
    modules/users/
    modules/organizations/
    shared/
  shared/contracts/
  shared/platform/
    src/redis/
  scripts/
  compose.yaml
```

I keep one DTO and entity per file. Auth uses its own database. Shared packages contain Identity contracts and reusable HTTP infrastructure.

## Full local stack

From the repository root:

```powershell
cd services
pnpm install --frozen-lockfile
pnpm setup:local
pnpm up
docker compose ps
docker compose logs -f auth
```

I need Node.js >=22.14, pnpm 10.34.x and a running Docker installation with Compose v2. Setup generates random database, Redis and session secrets and a 3072-bit RSA key pair in .secrets. It preserves existing values and appends missing Redis/session settings to an existing .env. Neither .env nor private keys belong in Git or the image.

The gateway exposes http://localhost:8080/api/v1. PostgreSQL is bound to localhost:5433, database retcon_auth and user retcon_auth; the password is in local .env. I stop with pnpm down, which preserves the volume. Changing an environment password does not rotate an already initialized PostgreSQL user's password.

Redis is bound to localhost:6379 and requires the generated REDIS_PASSWORD. Compose connects Auth to redis:6379, while local Node.js uses REDIS_URI from .env. Redis persists data in its own volume. The gateway mounts the repository-level infra/nginx.conf.

## Local Node.js

I run pnpm setup:local after updating the repository, then use pnpm infra:up and pnpm dev instead of pnpm up. infra:up starts PostgreSQL and Redis. Auth is available at http://localhost:3001/api/v1 and Swagger at http://localhost:3001/docs. Shared-package changes require a rebuild or dev restart. Full Compose disables public Swagger and does not expose Auth directly.

## Configuration

I load environment values in one configuration factory and read them through the standard ConfigService:

```typescript
const config = app.get(ConfigService);
await app.listen(
  config.getOrThrow<number>("http.port"),
  config.getOrThrow<string>("http.host"),
);
```

Providers receive ConfigService through constructor injection. My factory validates and transforms values with class-transformer / class-validator; the generic parameter alone does not convert strings. The namespaces are http, database, redis, session, jwt and auth.

ConfigModule uses skipProcessEnv to prevent fallback to unvalidated values. Local dev loads .env through Node's --env-file; Compose supplies environment values. ignoreEnvFile prevents implicit duplicate loading. A standalone start therefore requires an already prepared environment.

I configure HTTP host, body size, timeouts, CORS, logging, throttling, database pool/retries/timeouts and token lifetimes in .env.example. Existing files remain usable because optional settings have defaults. Auth route-specific limits remain explicit @Throttle policies.

## Redis and browser-session middleware

RedisService owns the standard node-redis client. It connects during Nest initialization, limits initial connection retries and command duration, reports connection failures without credentials, and closes the connection during application shutdown. After an established connection is lost, it keeps trying to reconnect; readiness fails until Redis returns. A failed startup closes the Nest application. Redis is a required runtime dependency even though the current login flow still uses JWT.

express-session uses connect-redis with resave=false and saveUninitialized=false. The middleware only persists sessions after application code adds session data. cookie-parser parses other cookies without a separate signing secret; express-session signs its own session ID using SESSION_SECRET.

SESSION_MAX_AGE accepts durations such as 7d through the ms package and becomes session.maxAgeMs in configuration. Boolean flags are converted in the configuration factory. A blank SESSION_DOMAIN produces a host-only cookie. SESSION_SECURE=false is for local HTTP; production requires secure and HttpOnly cookies, HTTPS and a correctly configured trusted proxy. SameSite=None requires secure cookies. Cross-origin browser requests also require credentials: "include" and an explicitly allowed origin; different sites require a suitable SameSite policy.

This middleware does not replace authentication: the current AccessGuard still accepts Bearer JWT only, and login does not populate req.session. A later rewrite must explicitly establish authenticated session data, regenerate the session ID at login, destroy the session and clear its cookie at logout, and protect cookie-authenticated state changes against CSRF. A browser-session cookie does not currently grant access to protected endpoints.

## Security and operation

I use bcrypt.hash / compare, with configurable cost 12 by default and a 72-byte password boundary. New passwords require at least 12 characters. JWT uses RS256 with issuer, audience, user, tenant, role, session and expiry. Refresh tokens are 48 random bytes encoded as hex; only SHA-256 lookup hashes are stored.

Logout blocks refresh, while existing access tokens live until exp, normally at most 15 minutes. Refresh families have a fixed expiry, normally 30 days. Clients must serialize refresh requests: replay detection can revoke a session when concurrent requests reuse a token.

GET /api/v1/health/live checks the process; /health/ready on the same service prefix checks PostgreSQL and Redis. Gateway /health checks Nginx only. Logs include request IDs and omit bodies, query strings and credentials.

TypeORM synchronize is enabled only for explicitly configured development. Production always disables it. I do not include SQL migrations or a custom migration runner; production schema preparation is a separate deployment prerequisite. Compose is a local demonstration environment, not an HA setup.
