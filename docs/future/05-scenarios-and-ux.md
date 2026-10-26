# User scenarios and interface structure

## Interface principles

Retcon should help employees complete their work and understand the outcome. Operation screens show the basis, expected data, actual inputs and next action. “Saved,” “submitted” and “posted” mean different things: a local record on a phone does not yet change the server balance.

The web interface adapts to the role. Accountants need open reconciliations and payments, dispatchers need trips and deviations, and warehouse operators need expected receipts and issues. The driver's mobile interface is simpler than the general workspace, with large controls and quick navigation between stops.

## Navigation

```text
Retcon
├── Overview
├── Containers
│   ├── Register and item cards
│   ├── Balances and availability
│   ├── Movements
│   └── Maintenance and stock counts
├── Deliveries and returns
│   ├── Requests
│   ├── Handovers and acceptance
│   └── Discrepancies
├── Logistics
│   ├── Map and active trips
│   ├── Trip planning
│   ├── Drivers and vehicles
│   └── Delivery and collection calendar
├── Settlements
│   ├── Return obligations
│   ├── Charges and payments
│   ├── Deposits
│   ├── Reconciliation statements
│   └── Periods and exports
├── Counterparties and contracts
├── Documents
├── Reports
├── Synchronization and tasks
└── Settings and audit history
```

This is the future application structure. Sections can appear in phases and be hidden without permission; their presence in this tree does not require empty MVP screens.

## Company onboarding

An administrator creates a workspace, adds the first warehouse and invites employees. The administrator then imports container master data and opening balances. Before confirmation, the system summarizes accepted rows, duplicate codes and unknown sites.

After data entry, it offers a test transfer in a clearly separated demonstration mode or a real request. Training data must be distinguishable from live accounting. Demonstration payments and balances cannot silently remain in the company's operational records.

## Delivery with a return collection

1. The manager selects the customer, contract, products and containers, then adds the expected collection.
2. The system shows available containers, customer obligations and unresolved contract issues.
3. The warehouse reserves and prepares the shipment, checking QR codes against the plan.
4. The dispatcher assigns the request to a trip with a driver and time window.
5. The driver confirms loading and starts the trip; the customer gains access to its delivery on the map.
6. At the stop, the driver records the actual delivery and a separate return collection.
7. The recipient confirms the agreed portion; disputed items receive a separate status.
8. The warehouse accepts the returned load, and the accountant reviews the calculation and posts associated documents.

At completion, the user sees “request → trip → handover → acceptance → settlement.” Each element links to adjacent records, eliminating searches for the same number across unrelated tables.

## Standalone collection of empty containers

A counterparty or manager creates a request specifying ready types and quantities, the collection site and its availability. The dispatcher checks nearby trips and adds a stop. The recipient sees the assigned window and can update readiness until the agreed cutoff.

If the actual quantity differs, the driver records the result and reason. The request can be partially fulfilled and its remainder transferred to a subsequent request. Both facts remain visible; selecting “complete” must not discard unfinished quantities.

## Working offline

A warehouse operator opens a previously downloaded receipt, scans containers and saves the action. The screen shows “saved on this device, awaiting upload” and a queue count. After restart, the application restores the operation with the same identifier.

When connectivity returns, the server checks permissions, versions and business rules. Valid operations receive server confirmation. If another employee moved the container in the meantime, the user sees a conflict containing both observations and their documents.

Unsubmitted operations remain visible before logout or workspace switching. The application warns about possible loss of the local queue and provides synchronization or an agreed recovery path. Client storage does not replace a server backup.

## Reviewing a discrepancy

The operator opens a discrepancy card containing the plan, actual result, both versions, observed times, photographs and related operations. The operator can request clarification, confirm the agreed portion, reject an incorrect intention or create an adjustment with a reason.

Before confirmation, the proposed decision shows its consequences: which balances change, which obligation closes and whether it establishes a financial charge. Correcting quantity records and recognizing damage may require different permissions. Auditors retain access to the decision history.

## The accountant workspace

An accountant opens a counterparty and sees three independent summaries: containers due for return, outstanding charges and deposits. The attention list contains unconfirmed receipts, unallocated payments, disputed amounts and documents awaiting external-system processing.

Selecting a charge reveals its formula, contract rate, quantity and source. Payment allocation shows the remaining balance. Reconciliation begins with a period and contracts, then generates a statement with links from each line. Period closure displays open issues so that the decision is informed.

## Main screens

| Screen              | Main content                                                 | Primary action                          |
| ------------------- | ------------------------------------------------------------ | --------------------------------------- |
| Overview            | Upcoming handovers, overdue items and approval queue         | Open a task                             |
| Container card      | Owner, location, condition, history and linked documents     | Perform a permitted operation           |
| Acceptance          | Plan, actual quantity, scanning, condition and discrepancies | Confirm the accepted portion            |
| Map                 | Trips, stops, coordinate freshness and ETA                   | Open a stop or adjust the plan          |
| Counterparty card   | Contracts, obligations, deliveries and settlements           | Create a request or statement           |
| Settlement register | Charges, payments, deposits and due dates                    | Allocate a payment or inspect its basis |
| Conflict center     | Incompatible operations and pending decisions                | Review and record a decision            |
| Mobile trip         | Current and next stops, delivery and collection              | Record the stop outcome                 |

## Textual wireframes

### Dispatcher map

```text
Logistics                          Today · Warehouse A · Active trips

Trips                              Map
R-104  In transit                  [Vehicle] ─── [Stop 2] ─── [Warehouse]
R-105  Awaiting loading
R-106  No fresh position

R-104 · Supplier A · Driver B
Next stop: Shop C
Delivery: 40 crates with products   Collection: 25 empty crates expected
Arrival: 14:20–14:35                Position received 12 seconds ago
[Open stop] [Contact] [Change plan]
```

### Settlement card

```text
Counterparty: Shop C                Period: selected by user

Due for return: 20 crates           Overdue: 5 of 20
Product debt: 50,000 KZT            Deposit retained: 30,000 KZT
Deposit related to an open dispute: 10,000 KZT

Date       Basis                   Charged / paid            Status
...        Delivery S-104          ...                       Posted
...        Return R-88             ...                       Disputed

[Create statement] [Record payment] [Open dispute]
```

These are conceptual screen sketches, not a claim that a graphical prototype exists. The numbers illustrate the structure.

## States and accessibility

Important statuses use text and icons so that color is not the sole distinction. Tables support search, filters and saved views. Forms retain drafts, display errors beside the affected fields and allow corrections without re-entering the entire document.

Scanning has a manual-code alternative, and the map has an accessible stop list. Users can navigate by keyboard, see focus and read clear messages. Loading and empty states explain what is happening and what can be done.

Russian is proposed as the first application interface language. The localization architecture must allow Kazakh and other languages without rewriting business logic. Money, date and time formats follow organization settings; event times have an unambiguous stored basis and are displayed in the appropriate time zone. The language of this documentation does not determine the application's localization scope.

[Next — target architecture](06-target-architecture.md).
