# Retcon product vision and value

## The proposed product

Retcon is a working environment for companies whose products move in returnable containers: crates, pallets, containers, kegs and other reusable packaging. A company will be able to manage containers as a resource, organize their movement with products or independently, monitor partner obligations and explain every amount in its settlements.

The central idea is a closed circulation cycle. Containers are issued, used, returned, inspected, washed or repaired when necessary, and put back into service. If a transition is not recorded, uncertainty appears: a container may still be with a customer, already on its way back, at another warehouse or missing. Retcon should turn that uncertainty into a specific status and a clear next action.

For users, the product will be a web application with workspaces for warehouse staff, managers, dispatchers, accountants and company management, plus a mobile driver interface. A partner portal can follow: customers will see their deliveries, request collection of empty containers, review discrepancies and check settlements.

## Why the problem matters

Returnable containers do not disappear when a product is sold. They continue to occupy space, have value and require a return journey. Their movement is often secondary to the main delivery: the products are accepted and paid for, while empty crates are left until the next vehicle arrives. After several trips, reconstructing the expected customer balance becomes difficult.

The gap between physical movement and documentation creates a chain of consequences. The warehouse reports a shortage, purchasing proposes buying more containers, the accountant tries to reconstruct an obligation from a spreadsheet, and the driver receives an additional collection request after departure. The system should connect these activities before they become urgent manual work.

These situations describe the problem and the proposed value. Their frequency, financial scale and the effect of implementation must be established through interviews and pilot data; no savings percentages are claimed in advance.

## Problems the system will address

### Container locations are unclear

A container card will show its owner, current holder, location, condition and confirmed operation history. Users can inspect an individual serialized item or a balance by type and location for identical low-cost crates. A question such as “where did the last twenty crates go?” should produce a list of transfers, not just a final number.

### Company and customer balances disagree

Retcon will preserve both sides of a discrepancy: the declared quantity and the quantity actually accepted. A disputed case will contain a reason, photographs, comments and a decision by an authorized employee. Confirmed history cannot be silently rewritten: a correction will be a separate linked operation.

### Accountants reconstruct settlements manually

Container transfers, contract terms, deposit rates, returns and compensation charges will be connected. The accountant will see the basis of an amount and navigate from a reconciliation line to its delivery and acceptance record. Repeated phone synchronization must not create a second obligation or accounting entry.

### Returns are missing from delivery plans

An order can include collection of empty containers, while a separate return request can be added to a trip. The dispatcher will see the volume, weight, time window and site readiness. This creates a basis for reducing unnecessary journeys; the actual benefit must be measured by comparing routes before and after implementation.

### Recipients do not know when the vehicle will arrive

The map will show the supplier's vehicle within the permitted trip, its latest received position and an estimated arrival time. The recipient can prepare staff, goods for return and empty containers. When connectivity is lost, the interface will show the age of the position instead of suggesting that tracking is still live.

### Connectivity disappears in warehouses or on the road

Operators and drivers will be able to save prepared operations locally and submit them later. Until the server validates the data, the interface will show a pending status. When two employees record incompatible actions, the system will preserve both intentions and provide a review workflow without losing the accounting history.

## Intended users and initial market

The proposed first target is a supplier or distributor with its own warehouse, recurring customers and a limited range of returnable containers. This pilot has a complete observable cycle: issue, trip, acceptance, return and reconciliation.

Later segments include beverage producers, food suppliers, distribution centers, container rental services and logistics operators. Their circulation processes have similarities, but sanitation, identification and settlement rules differ. Industry-specific rules should therefore follow validation of the core model rather than adding unverified requirements from every sector to the first release.

## Value for participants

| Participant        | Change in daily work                                                     | How to verify value                                   |
| ------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| Warehouse operator | Scans and confirms facts, sees available containers and blocking reasons | Acceptance time and number of manual corrections      |
| Account manager    | Sees customer obligations and can schedule a return with an order        | Share of requests with an agreed collection           |
| Dispatcher         | Uses one workspace for trips, stops and deviations                       | Trip preparation time and status-check calls          |
| Driver             | Receives stop order and records handover on site                         | Time to complete stop paperwork and missing documents |
| Accountant         | Receives linked operations, calculations and correction history          | Reconciliation time and unexplained discrepancies     |
| Company management | Sees circulation, return delays and disputed obligations                 | Cycle time, obligation age and container utilization  |
| Business partner   | Sees its documents, approaching vehicle and outstanding obligations      | Number of disputes and resolution time                |

## The distinguishing idea

Retcon's main advantage should be the continuity of its process. When a customer asks about a deposit, the accountant can see which containers returned and who confirmed acceptance. When the warehouse is waiting for containers, the dispatcher can identify the associated collection and vehicle location. When a driver reports a discrepancy, the manager can review it before documents are finally closed.

Every screen should answer a practical question and lead to an action: accept, inspect, return, assign a trip, approve or pay. Metrics without access to their underlying facts have limited value.

## Additional development directions

After the core cycle, the system could add a calendar of expected returns, automatic reminders, warehouse shortage forecasts, container lifecycle records and maintenance control. For example, it could suggest collecting containers from a customer when a large shipment is due in two days and the available balance is insufficient.

Another direction is container fleet utilization. A company could compare the time an item spends in circulation, at a warehouse, under repair and awaiting return. Confirmed reuse cycles could support environmental reporting. Translating these figures into material or emissions savings would require a separate methodology and documented conversion factors.

A future intelligent assistant could explain deviations and propose actions grounded in available facts. For example: “This customer holds 60 crates, and a trip is scheduled nearby tomorrow.” Decisions about write-offs, penalties, payments and accounting corrections will remain with authorized users.

## Product development and commercial potential

Retcon could develop into a service for multiple companies with isolated data and pricing based on warehouses, active users or operation volume. Dedicated deployment can be considered for customers with particular requirements. Specific prices, implementation fees and the business model require validation of demand and the cost of maps, document storage and support.

Early success means that one real company can complete the entire cycle without reconstructing its history manually in parallel. That outcome matters more than the module count because it demonstrates agreement between data, interfaces and business rules.

[Next — roles and capabilities](02-roles-and-features.md).
