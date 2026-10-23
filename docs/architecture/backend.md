# My backend setup and configuration

## Layout

```text
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
  scripts/
  infra/nginx.conf
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

I need Node.js >=22.14, pnpm 10.34.x and a running Docker installation with Compose v2. Setup generates random local credentials and a 3072-bit RSA key pair in .secrets, preserving existing files. Neither .env nor private keys belong in Git or the image.

The gateway exposes http://localhost:8080/api/v1. PostgreSQL is bound to localhost:5433, database retcon_auth and user retcon_auth; the password is in local .env. I stop with pnpm down, which preserves the volume. Changing an environment password does not rotate an already initialized PostgreSQL user's password.

## Local Node.js

I use pnpm infra:up and pnpm dev instead of pnpm up. Auth is available at http://localhost:3001/api/v1 and Swagger at http://localhost:3001/docs. Shared-package changes require a rebuild or dev restart. Full Compose disables public Swagger and does not expose Auth directly.

## Configuration

I load environment values in one configuration factory and read them through the standard ConfigService:

```typescript
const config = app.get(ConfigService);
await app.listen(
  config.getOrThrow<number>("http.port"),
  config.getOrThrow<string>("http.host"),
);
```

Providers receive ConfigService through constructor injection. My factory validates and transforms values with class-transformer / class-validator; the generic parameter alone does not convert strings. The namespaces are http, database, jwt and auth.

ConfigModule uses skipProcessEnv to prevent fallback to unvalidated values. Local dev loads .env through Node's --env-file; Compose supplies environment values. ignoreEnvFile prevents implicit duplicate loading. A standalone start therefore requires an already prepared environment.

I configure HTTP host, body size, timeouts, CORS, logging, throttling, database pool/retries/timeouts and token lifetimes in .env.example. Existing files remain usable because optional settings have defaults. Auth route-specific limits remain explicit @Throttle policies.

## Security and operation

I use bcrypt.hash / compare, with configurable cost 12 by default and a 72-byte password boundary. New passwords require at least 12 characters. JWT uses RS256 with issuer, audience, user, tenant, role, session and expiry. Refresh tokens are 48 random bytes encoded as hex; only SHA-256 lookup hashes are stored.

Logout blocks refresh, while existing access tokens live until exp, normally at most 15 minutes. Refresh families have a fixed expiry, normally 30 days. Clients must serialize refresh requests: replay detection can revoke a session when concurrent requests reuse a token.

GET /api/v1/health/live checks the process; /health/ready on the same service prefix checks PostgreSQL. Gateway /health checks Nginx only. Logs include request IDs and omit bodies, query strings and credentials.

TypeORM synchronize is enabled only for explicitly configured development. Production always disables it. I do not include SQL migrations or a custom migration runner; production schema preparation is a separate deployment prerequisite. Compose is a local demonstration environment, not an HA setup.
