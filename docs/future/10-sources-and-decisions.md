# Concept sources and open decisions

## Status of these materials

This series describes Retcon's future development as of 24 October 2026. It includes the explicitly requested directions: Returnable Containers, settlements and accounting support, a supplier map for delivery and collection of products with containers, a future structure and microservices using gRPC.

Roles, service boundaries, deposit processes, document lifecycles, integrations, quality targets and phases are proposed design decisions. They must be refined against actual user processes. “Will” and “proposed” do not mean that a feature has already been implemented or approved by the supervisor.

## Relationship to the supplied document

The supplied 24 October requirements document describes graduation-project materials: a proposal, evidence of relevance, a literature review, system and technology comparisons, requirements, diagrams, a prototype, a verification plan, project management and supervisor feedback. It also describes expectations for the repository and work traceability.

It was used as a source for structure and completeness criteria. Its directions to create a repository, tasks or tags, provide access or arrange reviews are not separate instructions to perform those external actions as part of preparing this Markdown concept.

The new series supplements existing materials but does not replace the scientific review, actual interviews, verified experiment results or real feedback. The existing [submission checklist](../management/submission-checklist.md) maps the supplied requirements.

| Source requirement             | Coverage in this concept                                                              | Separate evidence still required                      |
| ------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Idea, problem, users and scope | [Vision](01-product-vision.md), [roles](02-roles-and-features.md)                     | Fit with the pilot company's process                  |
| Relevance                      | Problem scenarios and measurable value hypotheses                                     | User discussions and source data                      |
| Literature and comparisons     | Links to the existing research section                                                | Research updates for finance and logistics            |
| Requirements                   | [Quality criteria](08-requirements-and-quality.md)                                    | Actual acceptance results                             |
| Architecture and diagrams      | [Architecture](06-target-architecture.md), [domain model](07-domain-and-contracts.md) | Implementation and exported diagrams for a submission |
| UX and prototype               | [Scenarios and textual wireframes](05-scenarios-and-ux.md)                            | An interactive prototype and user evaluation          |
| Verification                   | [Quality plan](08-requirements-and-quality.md)                                        | Measurements in the stated environment                |
| Management and risks           | [Roadmap](09-delivery-roadmap.md)                                                     | Created tasks, dates and change history               |
| Feedback                       | Research and pilot checkpoints                                                        | Actual comments and resulting decisions               |

## Repository evidence used

| Source                                                                                                | Confirmed basis                                                      |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [README](../../README.md)                                                                             | Name, purpose, participants, current Auth and early milestone limits |
| [Proposal](../proposal.md)                                                                            | Original accounting, offline-operation and conflict-resolution idea  |
| [Requirements](../requirements.md)                                                                    | Current Identity criteria and previously planned FR-08–FR-12         |
| [Current architecture](../architecture/overview.md)                                                   | Auth, PostgreSQL, Nginx and Identity data ownership                  |
| [Backend runbook](../architecture/backend.md)                                                         | Configuration, startup, security and operational limits              |
| [API prototype](../prototype/api.md)                                                                  | Existing Auth HTTP calls                                             |
| [Project plan](../management/project-plan.md)                                                         | Individual development, YouTrack and graduation milestones           |
| [Backend manifest](../../services/package.json) and [Auth manifest](../../services/auth/package.json) | Actual backend tools and dependencies                                |
| [Frontend manifest](../../frontend/package.json)                                                      | Current Next.js scaffold with separately configured tooling          |
| [Identity contracts](../../services/shared/contracts/src/index.ts)                                    | Current roles and claims                                             |
| [Security platform](../../services/shared/platform/src/security.ts)                                   | HTTP-oriented protection requiring a separate gRPC adaptation        |

No existing financial services, business RPCs or working map were found in the inspected structure. Architectural methods in this series are proposed contracts. Current `/api/v1/auth/*` methods remain HTTP APIs; migration toward the target architecture is phased.

## Primary technical sources

| Source                                                                                                            | Use                                                                              |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [gRPC Core concepts](https://grpc.io/docs/what-is-grpc/core-concepts/)                                            | Services, messages and RPC types                                                 |
| [NestJS gRPC](https://docs.nestjs.com/microservices/grpc)                                                         | `Transport.GRPC`, `protoPath`, `package`, `@GrpcMethod`, `ClientGrpc.getService` |
| [gRPC Deadlines](https://grpc.io/docs/guides/deadlines/)                                                          | Bounded waiting and propagation of time budgets                                  |
| [gRPC Retry](https://grpc.io/docs/guides/retry/)                                                                  | Controlled RPC retries                                                           |
| [Protocol Buffers proto3](https://protobuf.dev/programming-guides/proto3/)                                        | Message format, field numbers, types and evolution rules                         |
| [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)                               | Location permission, secure context and browser methods                          |
| [Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API) | Supplemental delivery after connectivity recovery and availability limits        |

These sources verify technical capabilities. Service boundaries, financial rules and quality thresholds are project design decisions, not requirements imposed by the sources. Dependency versions must be pinned after the technical spike; documentation links do not guarantee compatibility of arbitrary package combinations.

## Preliminary architectural decisions

| Decision                                       | Reason                                                         | Cost and consequences                                                  |
| ---------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Microservices with internal gRPC               | Explicit contracts and independent domains                     | Failure handling, observability and version compatibility are required |
| HTTP BFF for clients                           | A common entry point and practical browser API                 | An additional layer needing limits and its own checks                  |
| PostgreSQL with service-owned data             | Transactional accounting and clear responsibility              | Reports need projections; processes need cross-service consistency     |
| Outbox and inbox delivered over gRPC initially | Durable delivery without a mandatory separate broker           | Workers, retries and ordering must be implemented explicitly           |
| Immutable posted facts                         | Explainable balances and corrections                           | Adjustments are more involved than direct editing                      |
| Separate monetary and quantity registers       | Physical returns and financial resolution occur independently  | Links and intermediate states need consistent presentation             |
| Separate Logistics and Tracking                | Trip planning and coordinate streams have different workloads  | Device, driver and trip relationships must be verifiable               |
| Serialized MVP                                 | Matches the original topic and supports clear conflict testing | Quantity-based accounting remains a separate extension                 |
| Mobile web client for the MVP                  | Validates the main process without a separate mobile product   | Background geolocation requires a separate decision                    |

Once confirmed, decisions become ADRs in the [decisions directory](../decisions/README.md), with context, alternatives and consequences. Existing ADRs must not be silently rewritten as if the new architecture had existed from the start.

## Questions to resolve before implementation

| Question                                         | Working assumption in the concept                              | Confirmation point                   |
| ------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------ |
| Which company is the pilot?                      | One supplier, a warehouse and recurring counterparties         | Phase 0                              |
| Which containers matter most?                    | Serialized returnable items with QR labels                     | Before the register                  |
| How is acceptance confirmed?                     | A responsible user and document; disputes handled separately   | Before the warehouse cycle           |
| When does a return obligation end?               | Accepted return or a separately approved decision              | Before settlements                   |
| How does the deposit work?                       | Rate and release conditions in a contract version              | With the accountant before phase 4   |
| Which jurisdiction and accounting policy apply?  | Not fixed; KZT is illustrative only                            | Before statutory entries and exports |
| Which accounting system is needed?               | One selected connector after basic export                      | Before the pilot                     |
| Whose vehicle and device provide GPS?            | The assigned driver or an authorized tracker                   | Before the map phase                 |
| Which map provider is selected?                  | Replaceable adapter; selection after coverage and terms checks | Before SDK implementation            |
| What can counterparties see?                     | Only their delivery and an agreed tracking segment             | Before the external portal           |
| How long are coordinates and documents retained? | Separate policies by data type                                 | Before the pilot                     |
| What load and downtime are acceptable?           | The preliminary quality profile                                | During load and operational tests    |

These questions do not prevent a coherent concept. They identify where implementation must follow a concrete company decision rather than an arbitrary developer assumption.

[Return to the index](README.md).
