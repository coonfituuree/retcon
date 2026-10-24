# The future Retcon Returnable Containers project

Retcon is a system that connects returnable-container circulation, product deliveries, warehouse operations, transport movements and settlements with business partners. Its purpose is to give a company a clear answer to four related questions: where its containers are, who is responsible for them, when they will return, and which documents and amounts support that record.

This document series describes the complete future product concept as of 24 October 2026. It includes an accountant workspace, deposits, delivery and container collection, a live supplier map, and a microservice architecture with internal communication over gRPC. This is the target model; a documented capability is not necessarily an implemented feature.

## Where to start

| Document                                                            | What it explains                                                                       |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Product vision and value](01-product-vision.md)                    | Why Retcon is needed, which problems it solves, who benefits and how it could develop  |
| [Roles and capabilities](02-roles-and-features.md)                  | Who uses the system, which modules are planned and how permissions are restricted      |
| [Accounting and settlements](03-accounting-and-settlements.md)      | Container movements, return obligations, deposits, financial settlements and documents |
| [Logistics and the live supplier map](04-logistics-and-live-map.md) | Delivery, collection, trips, GPS, estimated arrival times and the driver workflow      |
| [Scenarios and interfaces](05-scenarios-and-ux.md)                  | Daily workflows and the screens users will interact with                               |
| [Target architecture](06-target-architecture.md)                    | Microservices, gRPC, data ownership, reliability and repository structure              |
| [Domain model and contracts](07-domain-and-contracts.md)            | Entities, states, invariants and proposed API and event contracts                      |
| [Requirements and quality](08-requirements-and-quality.md)          | Priorities, acceptance criteria, security and outcome measurement                      |
| [Delivery roadmap](09-delivery-roadmap.md)                          | Implementation phases, dependencies, verification, risks and demonstration             |
| [Sources and open decisions](10-sources-and-decisions.md)           | Connections to existing materials, technical sources and research questions            |

The first five documents introduce the product. Architecture, data models, requirements and the roadmap should be read together when designing or implementing it: the interface, accounting rules and server contracts must interpret the same operation consistently.

## The central product story

A supplier delivers products to a shop in reusable crates. The shop needs to prepare its unloading area and collect empty containers. The dispatcher wants to know whether the driver is on schedule, while the accountant needs to establish how many crates remain with the shop and how much deposit can be refunded. These questions may currently be handled in separate spreadsheets and conversations.

In Retcon, they will belong to one process. An order becomes a trip, the trip appears on the map, the driver records delivery and collection, the warehouse accepts the actual quantity, and the accountant receives the associated documents and calculation. If some containers are damaged or the parties disagree, the system presents a separate discrepancy with evidence and an assigned owner.

## What exists and what still needs to be built

The repository currently contains NestJS Auth, organizations, users, roles, sessions, PostgreSQL, Nginx and a local environment. The client is a Next.js scaffold. Business services for container accounting, settlements, logistics and tracking, working user screens and gRPC contracts still need to be implemented. Current startup instructions are in the [main README](../../README.md), and the executable service is described in the [current architecture](../architecture/overview.md).

Earlier documents limited the initial milestone to container accounting, offline operations and synchronization conflicts. This concept expands the future product: settlements and accounting support become part of the system, while the map helps organize delivery and returns. A complete ERP, tax reporting and advanced automatic fleet optimization remain separate future possibilities.

## Three delivery horizons

1. **MVP — a complete working cycle.** Container register and balances, delivery and return, basic settlements and deposits, a trip with a map, basic documents, an offline queue and conflict review. A user can complete the process from a request to reconciliation.
2. **Pilot — operation with a real company.** More detailed permissions, reliable driver support, document approval, an integration with the selected accounting system, operational checks and user feedback.
3. **Product development.** Multiple organizations and branches, complex rates, serialized and quantity-based accounting for different container types, demand forecasting, return optimization and equipment integrations.

The system will develop in small, verifiable increments. Its architecture nevertheless recognizes from the outset that an accounting fact, a vehicle coordinate and a financial charge have different meanings, workloads and reliability requirements.
