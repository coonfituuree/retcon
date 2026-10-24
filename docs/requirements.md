# My Auth requirements

The [expanded future requirements](future/08-requirements-and-quality.md) cover container accounting, settlements, supplier tracking, delivery and collection, and the gRPC target architecture. Their `FUT-*` identifiers are planned specification references, separate from the current criteria below.

I treat all requirements below as mandatory for this milestone. Code availability and successful acceptance are separate states.

| ID     | Requirement               | Acceptance criterion                                                                                        | Issue / scenario      |
| ------ | ------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------- |
| FR-01  | Organization registration | One transaction creates an organization, ADMIN and session; disabled registration is rejected.              | RET-9 / V-01          |
| FR-02  | Password login            | Active users authenticate with bcrypt; failures do not reveal whether an email exists.                      | RET-10 / V-02         |
| FR-03  | Access-token protection   | The guard verifies RS256, issuer, audience, age and claims; invalid tokens return 401.                      | RET-11 / V-03         |
| FR-04  | Refresh rotation          | Each refresh is consumed once; replay revokes the session family; concurrent rotation is serialized.        | RET-12 / V-04         |
| FR-05  | Logout and expiry         | Logout prevents further refresh; the original session expiry is preserved.                                  | RET-13 / V-05         |
| FR-06  | Safe profile              | GET /auth/me returns the active user's profile without passwordHash.                                        | RET-14 / V-06         |
| FR-07  | User creation             | Only ADMIN creates users; organization is taken from verified JWT claims.                                   | RET-14, RET-15 / V-07 |
| NFR-01 | Validated configuration   | ConfigService.getOrThrow reads transformed settings; invalid settings fail startup.                         | RET-6 / V-08          |
| NFR-02 | Secret protection         | Passwords use bcrypt; random refresh values are stored as SHA-256 hashes; secrets stay out of Git and logs. | RET-7, RET-16 / V-08  |
| NFR-03 | HTTP diagnostics          | Request IDs, safe JSON logs, Helmet, CORS, throttling and process/database health are available.            | RET-16 / V-08         |
| NFR-04 | Reproducibility           | Lockfile, Compose, Dockerfile and instructions match Auth only; production synchronize is disabled.         | RET-17, RET-19 / V-09 |

I obtain tenantId from verified claims rather than caller-controlled input. I never store raw passwords or refresh values. An issued JWT remains valid until exp after logout; immediate distributed revocation is not implemented. Profile reads also check user activity; administrative authorization uses the role in the currently valid JWT.

## Planned project requirements

The Identity criteria above describe current code. I also define the following mandatory target capabilities; none is marked implemented.

| ID     | Target requirement                      | Acceptance criterion                                                                                  | Status  |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| FR-08  | Individual asset register and locations | An item has a stable identity, one current location and a reviewable registration fact.               | Planned |
| FR-09  | Movement accounting                     | A permitted move changes the expected state once and records its origin, destination and author.      | Planned |
| FR-10  | Offline operation capture               | An operation survives client restart without connectivity and retains its identifier for retries.     | Planned |
| FR-11  | Retry-safe synchronization              | Repeated delivery produces one business effect; changed data under the same identifier is rejected.   | Planned |
| FR-12  | Conflict detection and review           | Incompatible intentions remain visible; an authorized decision preserves the original and its reason. | Planned |
| NFR-05 | Reproducible business evaluation        | The dataset, hardware, network conditions, baselines and measured outcomes are recorded.              | Planned |

I trace these target requirements to future implementation and evaluation tasks after creating their actual YouTrack cards. They do not add deferred services to the current workspace.
