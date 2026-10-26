# Requirements and quality criteria

## Reading these requirements

Every requirement in this document belongs to the future product and currently has a planned status. `FUT-*` identifiers are documentation references, not IDs of created YouTrack issues. Current Auth acceptance criteria remain in the [existing specification](../requirements.md).

**MVP** means a mandatory part of the first complete scenario, **pilot** means a requirement for expanding into real company operations, and **development** means a later capability. A criterion verifies observable behavior rather than merely the existence of a button or table.

## Functional requirements

| ID     | Capability                       | Priority    | Acceptance criterion                                                                                                                    |
| ------ | -------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| FUT-01 | Organization isolation           | MVP         | A user in organization A cannot read or modify B's objects through HTTP, gRPC, files, reports or map subscriptions                      |
| FUT-02 | Action and site permissions      | MVP         | An operator confirms operations only for permitted warehouses; a denied request has no accounting effect                                |
| FUT-03 | Master data and opening balances | MVP         | Imports display errors before posting, and accepted opening balances have an author and basis                                           |
| FUT-04 | Serialized containers and QR     | MVP         | A code opens one item with its type, owner, location, condition and history                                                             |
| FUT-05 | Reservations and movements       | MVP         | Concurrent requests cannot issue the same item twice; movement changes its version and history atomically                               |
| FUT-06 | Handover and return              | MVP         | A partial return reduces the obligation only by the accepted quantity; damaged containers remain accounted for at their actual location |
| FUT-07 | Contract terms                   | MVP         | A posted document retains the applied rate and deadline version after the contract changes                                              |
| FUT-08 | Product and container requests   | MVP         | Product and container quantities are independent; one request supports delivery and collection                                          |
| FUT-09 | Trip planning                    | MVP         | A dispatcher assigns a driver and vehicle, defines stops and sees each stop's outcome                                                   |
| FUT-10 | Live supplier map                | MVP         | An authorized user sees the vehicle for their trip, the stop and the latest position time                                               |
| FUT-11 | Stale and invalid coordinates    | MVP         | Late points do not replace newer ones; missing updates are identified in text                                                           |
| FUT-12 | Arrival estimates                | MVP         | An available routing provider produces a timestamped estimate; an outage leaves an address list available                               |
| FUT-13 | Driver workflow                  | MVP         | Drivers record delivery and collection separately, including actual quantities and discrepancy reasons                                  |
| FUT-14 | Offline queue                    | MVP         | An operation survives application restart in the tested environment and uploads with its original ID                                    |
| FUT-15 | Safe retry                       | MVP         | Repeating a command 100 times creates one effect; different content under the same ID is rejected                                       |
| FUT-16 | Conflict review                  | MVP         | Incompatible intentions remain stored; decisions have authors and reasons; auditors can inspect original data                           |
| FUT-17 | Deposits and settlements         | MVP         | The accounting example yields 20 units due for return, a 30,000 KZT deposit balance after refund, and 50,000 KZT product debt           |
| FUT-18 | Payments and allocations         | MVP         | A partial payment reduces the selected charge; reimporting it does not duplicate the payment                                            |
| FUT-19 | Documents and reconciliation     | MVP         | Each statement line links to its basis; adjustments preserve the original document                                                      |
| FUT-20 | Basic notifications              | MVP         | The assigned user receives one internal task notification when the source event is repeated                                             |
| FUT-21 | Period closure                   | Pilot       | A late document does not change a closed period without an authorized procedure and audit trail                                         |
| FUT-22 | Counterparty portal              | Pilot       | A counterparty sees only its own documents, can request collection and dispute a statement line                                         |
| FUT-23 | Accounting integration           | Pilot       | A document has an external ID and processing status; repeat delivery does not create a duplicate                                        |
| FUT-24 | Operational background tracking  | Pilot       | The selected device and GPS source are tested in the background, with a locked screen, after network loss and when collection stops     |
| FUT-25 | Stock counts                     | Pilot       | A count creates a discrepancy and documented correction rather than silently replacing a balance                                        |
| FUT-26 | Quantity-based accounting        | Development | Quantities by type, owner, location and condition reconcile with the journal and do not duplicate serialized items                      |
| FUT-27 | Container maintenance            | Development | Unserviceable containers cannot be issued until authorized repair or inspection completion                                              |
| FUT-28 | Optimization and forecasting     | Development | A recommendation explains its inputs and is compared with manual planning using selected metrics                                        |

This MVP is broader than the initial Auth milestone. If resources are limited, reduce module depth: one container type, one currency, simple contract terms and manually ordered stops. Preserve the connection between returns, the map and settlements.

## Non-functional requirements

| ID      | Requirement             | Verification                                                                                                                 |
| ------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| FUT-N01 | gRPC contracts          | Client generation succeeds; a compatible added field does not break an older consumer; incompatible changes fail CI          |
| FUT-N02 | Transactional integrity | Process interruption cannot leave a movement without a command result or outbox entry; financial entries balance by currency |
| FUT-N03 | Repeated delivery       | Lost responses and worker restarts do not duplicate charges; the queue drains after recovery                                 |
| FUT-N04 | Observability           | One correlation ID links the public request, internal RPC, event and financial basis                                         |
| FUT-N05 | Data protection         | Tests cover roles, organizations, direct IDs, exports, file links, SSE and internal method calls                             |
| FUT-N06 | Recovery                | A backup restores into a clean environment, preserving invariants and deduplication                                          |
| FUT-N07 | Interface accessibility | Core operations work by keyboard; statuses are understandable without color; the map has a list alternative                  |
| FUT-N08 | Localization            | Time, currency and language display consistently; changing time zone does not alter accounting-version order                 |
| FUT-N09 | Predictable degradation | Failures of maps, notifications or exports do not block permitted local accounting transactions                              |

## Preliminary measurable targets

The following figures are design targets, not measured results of the existing system. Before a load test, record CPU, memory, storage, versions, database configuration and data generator.

The proposed initial dataset contains 10,000 container items, 100,000 movements, 50 active user sessions and 20 simultaneously tracked vehicles, each sending one point every 15 seconds. Include several organizations so that isolation is tested alongside single-table speed.

| Measure                                      | Initial target                          | Conditions                                                                    |
| -------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| Card and balance-page reads                  | p95 within 700 ms                       | A dedicated 30-minute run on a documented environment; external maps excluded |
| Single movement posting                      | p95 within 1 second                     | Server path, without photograph uploads                                       |
| Server-to-map position delivery              | p95 within 5 seconds                    | Measured after server receipt, with an active client connection               |
| Position age under normal connectivity       | p95 within 30 seconds                   | A 15-second send interval; measured separately from server latency            |
| Financial processing of a return event       | p95 within 5 seconds                    | Healthy services, without an accumulated outage backlog                       |
| Duplicates after 100 command retries         | 0                                       | Same key, payload and organization                                            |
| Cross-organization leaks in tested scenarios | 0                                       | Complete negative-test matrix                                                 |
| Pilot database recovery                      | RTO within 4 hours, RPO within 24 hours | Preliminary daily-backup target, subject to pilot requirements                |

These RTO and RPO values are not automatically appropriate for every business. Before production, agree the acceptable data loss and backup frequency, then measure actual restoration. Until that exercise succeeds, the service level is not claimed as achieved.

## Critical verification scenarios

### One container and two operators

Both operators read version 7. The first confirms an issue, while the second attempts an incompatible transfer. The outcome is one version 8, one posted movement and a visible conflict for the second operation. No request-delivery order may create two current locations for one item.

### Response lost after posting

The server commits a movement, but the client receives no response. Retrying the original ID returns the original outcome. Reproduce the same scenario between Inventory and Settlements: a lost acknowledgement must not duplicate deposit release.

### Return with damaged items

Use the numeric example in the [accounting model](03-accounting-and-settlements.md). Check physical balances, availability, obligations, deposits and product debt. Testing the grand total is insufficient; separate categories and their origins matter.

### A full day offline

A client saves an operation batch, restarts and reconnects after server-side changes. Compatible operations post once, while conflicting ones remain available for review. Expired authorization requires sign-in, and device time does not replace server ordering.

### An incomplete trip

Acceptance succeeds at one stop, the recipient is absent at another, and a third has a partial collection. Trip completion retains every outcome. The unfulfilled request portion remains open for further planning.

### Mapping provider outage

The external routing service is unavailable. The operator sees an explanation, addresses and contacts; the driver continues recording stops; accounting and settlements remain operational. Once the provider recovers, ETA is recalculated with a new freshness timestamp.

## Evaluating usefulness

Choose a reproducible manual baseline: a journal or spreadsheet containing the same deliveries and returns. Measure entry time, reconciliation time, unexplained discrepancies, retry duplicates and history lookup time.

Both procedures receive the same facts and predefined errors. Record participant experience, data volume and connectivity conditions. Results from one experiment must not be generalized to every company without evidence.

The pilot also observes container cycle time, overdue-return share, calls asking for vehicle location and repeat journeys. To associate changes with Retcon, record simultaneous changes in routes, staffing and order volume.

## Security and operational checks

Dedicated scenarios cover access revocation, previously issued JWTs, role changes, file limits, organization spoofing, invalid coordinates, another user's `operation_id`, logging leaks and subscription leaks. The pilot verifies local-queue recovery and server backup restoration.

A business operation is accepted only when its criteria pass. Build, type checks and lint remain mandatory technical checks, but they do not prove deposit calculations or acceptance correctness. Reports distinguish passed tests, failed scenarios and checks not yet executed.

[Next — delivery roadmap](09-delivery-roadmap.md).
