# Roles and capabilities of the future system

## Organizing work

A company in Retcon will be a workspace with its own warehouses, users, counterparties, contracts and circulation rules. Branches can share master data while retaining separate balances and responsibilities. A counterparty does not automatically become a system user: it can receive restricted access to its own operations.

For the MVP, the proposed model is one company workspace with partners represented as counterparties. Exchange between two fully independent Retcon organizations will come later and requires explicit agreement on shared documents and statuses.

## User roles

The roles below describe the target model. Current Auth only contains `ADMIN`, `OPERATOR` and `AUDITOR`; additional roles and permissions must be designed and implemented.

| Role               | Primary work                                                           | Restrictions                                                |
| ------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| Workspace owner    | Company configuration, administrator assignment and integrations       | Cannot silently alter posted operations                     |
| Administrator      | Users, permissions, warehouses, master data and settings               | Financial approvals require separate permission             |
| Account manager    | Counterparties, contracts, requests and return deadlines               | Cannot post write-offs or alter received payments           |
| Warehouse operator | Acceptance, issue, scanning and stock counts                           | Limited to assigned warehouses and permitted operations     |
| Dispatcher         | Vehicles, drivers, trips, map and plan adjustments                     | Cannot confirm physical acceptance on behalf of a recipient |
| Driver             | Assigned trips, deliveries, collections, photographs and stop statuses | Sees assigned trips and necessary contact details           |
| Accountant         | Charges, payments, deposits, reconciliation and period closure         | Corrects records through documented adjustments             |
| Company manager    | Summaries, exception approval and limits                               | Detail access follows assigned scopes                       |
| Auditor            | History, documents and decisions                                       | Read-only access                                            |
| Counterparty       | Its own requests, deliveries, returns and reconciliations              | Cannot see other parties' trips, balances or contracts      |

Permissions combine an action and a scope, such as “confirm acceptance at warehouse A” or “view settlements for counterparty B.” In a small company, one person can hold several roles. Significant write-offs and cash refunds can require approval by another employee.

## Master data and onboarding

The company first creates warehouses and partner sites, container types, owners, products and contracts. A container type has an accounting unit, dimensions, capacity, approximate weight and permitted conditions. Capacity supports transport planning but does not replace the actual product quantity.

A contract defines container ownership, return deadlines, deposit requirements, acceptable conditions and damage approval procedures. Changes create a new version with an effective date. Existing documents continue to reference the terms under which they were created.

Initial data entry will use import templates for counterparties, containers and opening balances. Before posting, users see validation errors and a preview. Opening balances require a separate recorded basis: the system cannot reconstruct historical movements from a single closing number.

## Container register

Each serialized item will have an internal ID, readable label, type, owner, commissioning date and condition history. A QR code opens its card and helps select an operation. Losing a label must not create a new asset; controlled relabeling is required.

For identical low-cost crates, the target model also supports quantity-based accounting. It records batches and quantities by type, owner, location and condition. The MVP retains serialized accounting as its main scenario; quantity-based accounting is a separate extension after mixed-accounting rules have been validated.

The card shows availability for issue, the current holder, the latest confirmed operation, open disputes, the associated trip and maintenance history. A container's location follows its accounting operation; a vehicle coordinate shows the position of the transport on which the container is recorded as in transit.

## Warehouse operations and stock counts

The warehouse module will support receipts, issues, returns, inter-site transfers, reservations, quarantine, repairs and write-offs. Every action shows expected and actual quantities, its initiator and its basis.

During a stock count, an employee records the observed balance at a selected point in time. The difference becomes a discrepancy document. An authorized user reviews causes, identifies delayed operations and creates a correction where needed. Scanning during a count must not silently replace the warehouse balance.

## Orders and product operations

A request contains products, required containers, an address, a time window and any return collection. One request can cover delivery of products in containers and simultaneous collection of empty containers. Standalone collections have their own request type.

Product quantity and container quantity are separate line attributes. For example, 200 product units in 20 crates remain two independent quantities. Partial product delivery must not automatically imply a proportional packaging return.

The MVP product scope covers a product catalog, delivery lines, quantities and values needed for settlements. Manufacturing, complete stock costing, purchasing plans and a full product ERP remain later development or integration work.

## Settlements and the accountant workspace

One area brings together return obligations, product charges, deposit balances, approved late-return or damage charges, payments and reconciliation documents. Accountants can inspect the origin of any amount, allocate payments to their bases and see remaining balances.

The system proposes calculations using contract terms but does not automatically turn an unconfirmed shortage into an accepted debt. Disputed amounts are displayed separately. Detailed rules and an example appear in the [accounting model](03-accounting-and-settlements.md).

## Delivery and reverse logistics

The dispatcher builds a trip from requests, assigns a driver and vehicle, and determines stop order and cargo volume. Each stop separately identifies deliveries and collections. This matters for reverse logistics: space released by unloading can carry empty containers back.

The map is combined with a trip list, filters and an event history. A map marker leads to a stop, a stop to a delivery, and a delivery to acceptance and settlement records. Details are in the [logistics document](04-logistics-and-live-map.md).

## Documents and communication

Planned documents include handover and return records, discrepancy reports, reconciliation statements, charges and adjustments. Photographs and files attach to specific operations. Documents have versions, authors, creation times, approval statuses and links to source facts.

Notifications cover an approaching vehicle, collection readiness, overdue returns, disputes and required approvals. Recipient settings control channels and frequency. Email, messaging and SMS require configured external providers; those integrations are not treated as already available.

## Analytics

Management will see balances by location and condition, containers held by partners, the age of outstanding return obligations, cycle time, damage and trip utilization. Accountants will have balance-and-movement reports, counterparty statements, deposit movements and receivables by age.

Each report shows its period, filters, update time and treatment of disputed operations. Background processing delays remain visible. A report must not disguise an unprocessed operation as a zero balance.

## Extensions after the pilot

Possible extensions include maintenance based on circulation cycles, washing and repair management, RFID equipment, return forecasting, inter-organization document exchange and ERP or accounting integrations. Each extension is prioritized according to observed process value and support cost.

[Next — accounting and settlements](03-accounting-and-settlements.md).
