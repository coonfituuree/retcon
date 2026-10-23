# My technology decisions

I compare alternatives against the project constraints rather than unmeasured speed claims.

## Server platform

| Alternative                                                  | Relevant property                                        | Consequence                                                    |
| ------------------------------------------------------------ | -------------------------------------------------------- | -------------------------------------------------------------- |
| [NestJS](https://docs.nestjs.com/)                           | TypeScript modules, dependency injection and API tooling | Matches my selected stack and current Auth                     |
| [Spring Boot](https://docs.spring.io/spring-boot/index.html) | Standalone Java applications and operational tooling     | A viable service platform, but adds another language ecosystem |
| [FastAPI](https://fastapi.tiangolo.com/)                     | Python types, request validation and OpenAPI             | A viable API option, with separate cross-language contracts    |

I choose NestJS to keep the implementation aligned with my TypeScript workflow.

## Data storage

| Alternative                                                                      | Relevant property                                  | Consequence                                                   |
| -------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------- |
| [PostgreSQL](https://www.postgresql.org/docs/17/explicit-locking.html)           | Relational constraints, transactions and row locks | Fits organizations, users and serialized session rotation     |
| [MySQL/InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html) | Transactional relational storage                   | Also viable; database-specific behavior would need adaptation |
| [MongoDB](https://www.mongodb.com/docs/manual/core/transactions/)                | Document model and multi-document transactions     | Also supports atomic work, but changes relationship modeling  |

I choose PostgreSQL with TypeORM. I do not reject MongoDB on the false premise that it has no transactions.

## Authentication/session approach

| Alternative                             | Relevant property                                       | Consequence                                                              |
| --------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Signed access JWT plus rotating refresh | Local verification with a bounded access-token lifetime | My current choice; logout does not instantly invalidate issued JWT       |
| Opaque server-side session              | Session state can be checked centrally on requests      | Requires a request-time session lookup and suitable browser/API handling |
| External OpenID Connect provider        | Delegates identity capabilities to a provider           | Adds provider operation/integration and a different project boundary     |

I implement the first option using [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), not a custom signing algorithm. JWT alone is not an OAuth/OpenID Connect provider.

I use [ConfigService](https://docs.nestjs.com/techniques/configuration), [class-validator / ValidationPipe](https://docs.nestjs.com/techniques/validation), [TypeORM](https://docs.nestjs.com/techniques/database) and [bcrypt](https://github.com/kelektiv/node.bcrypt.js) as requested standard libraries. A future browser client still needs an explicit token-storage and CSRF design; the current API does not establish that implementation.
