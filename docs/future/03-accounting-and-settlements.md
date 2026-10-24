# Container accounting and financial support

## What the system must explain

Retcon's accountant workspace will connect container movements with associated settlements. Users must understand how many units remain with a counterparty, why an amount was charged, which payment settles it and which issues still require approval.

The proposed scope is an operational and management accounting subsystem with records of charges, payments and deposits. Statutory accounting and tax rules depend on the country, organization and accounting policy. The chart of accounts and export to the selected accounting system must be designed with the pilot company's accountant. The rules below are a product model; monetary examples are illustrative scenarios.

## Four connected registers

| Register              | Question answered                                        | Example                                                                     |
| --------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| Physical movement     | Where containers are and in what condition               | 80 crates accepted into the warehouse, including 10 damaged                 |
| Return obligations    | How many containers a counterparty still needs to return | Of 100 issued units, 20 remain outstanding                                  |
| Financial settlements | What has been charged, paid and remains payable          | Products charged at 150,000, with 100,000 paid                              |
| Deposit funds         | What has been received, released, retained or refunded   | 100,000 received, 70,000 refunded, 30,000 retained against identified bases |

This separation is necessary because a physical return and financial settlement can happen on different days. A damaged crate is already at the warehouse while compensation remains unresolved. A payment can settle products without changing the deposit. Available containers and the total recorded balance also differ when some items are under repair.

## Core movement rules

A transfer contains its source, recipient, container type, quantity or item list, condition, contract and responsible parties. During transport, the vehicle or another in-transit location becomes an intermediate holder. Warehouse dispatch and customer acceptance are therefore separate facts.

In serialized accounting, every item has one confirmed current location or holder. A movement checks the expected record version. In quantity-based accounting, the quantity for a combination of location, type, owner and condition cannot become negative without an explicitly permitted correction process.

A reservation reduces availability for issue but does not change the physical balance. Quantity-based accounting can use:

```text
Available for issue = serviceable balance at the site − active reservations
```

Items reserved for another purpose, damaged or held elsewhere cannot be issued as free stock. Two concurrent requests for the same container are resolved inside an Inventory transaction, not by comparing numbers in the browser.

## Return obligations

For a selected counterparty, container type, owner and contract, the outstanding return obligation is calculated from confirmed operations:

```text
Closing obligation = opening obligation
                   + transferred to the counterparty
                   − accepted back
                   − obligations formally discharged
                   ± documented adjustments
```

Discharge can follow an approved purchase or acknowledged loss. It does not mean that the container physically returned. Writing off the asset and closing the partner's obligation are related but separate decisions.

For transfers between partners, the system must know who authorized the holder change and who now has the return obligation. In the MVP, such transfers should go through an authorized company operator. Unrestricted transfers between independent participants follow only after both-party confirmation rules have been defined.

## Deposits and refunds

The contract defines the deposit rate, currency, release conditions and handling of damage. The document retains a snapshot of the applied terms. A later rate change does not recalculate an already posted delivery.

Proposed deposit states distinguish amounts awaiting receipt, received, securing an obligation, available for refund, held pending a decision, refunded and offset by agreement. A single “deposit closed” label is insufficient: the accountant needs a balance by basis.

Refunding money requires a recorded financial action. Selecting “accept containers” only establishes the basis for releasing the deposit under the contract. Without a banking integration, the accountant manually records the payment and its evidence; an unconfirmed transfer is not shown as completed.

## End-to-end example

A supplier transferred 100 crates to a customer. The illustrative deposit rate is 1,000 KZT per crate. Assume that the contract releases the deposit after acceptance of serviceable containers and retains disputed amounts until approval. The customer paid a separate deposit of 100,000 KZT.

Later, the driver collected 80 crates. The warehouse confirmed 70 serviceable and 10 damaged units. Another 20 remain with the customer. The system then shows:

| Measure                                       | Value      | Basis                         |
| --------------------------------------------- | ---------- | ----------------------------- |
| Physically returned to the warehouse          | 80 crates  | Confirmed acceptance          |
| Available for further issue from this return  | 70 crates  | 10 are in quarantine          |
| Customer's return obligation                  | 20 crates  | 100 issued minus 80 returned  |
| Deposit available for refund after acceptance | 70,000 KZT | 70 serviceable units          |
| Deposit securing unreturned containers        | 20,000 KZT | 20 units held by the customer |
| Deposit retained pending the damage decision  | 10,000 KZT | Open discrepancy report       |

After a confirmed refund of 70,000 KZT, the total remaining deposit is 30,000 KZT: 20,000 secures unreturned containers and 10,000 relates to the open dispute. Damaged crates are not simultaneously counted as physically unreturned. Damage compensation does not arise before a separate approved basis exists.

If product charges were 150,000 KZT and payments were 100,000 KZT, the product debt is 50,000 KZT. That amount is not combined with the deposit into an unnamed “total debt.” An offset requires a separate operation with explicit bases and permissions.

## Charges and payments

Settlement records distinguish products, delivery, container rental, approved late-return charges, damage and other contractual services. Deposits remain separate. The system retains the calculation base, period, rate, quantity, currency and rounding rule.

Monetary values use exact storage: integer minor units with a currency code or fixed-precision decimal. Fractional rates have a defined precision; intermediate calculations do not use binary floating-point arithmetic. Amounts in different currencies are not added without a documented conversion rule.

One payment can be allocated to several charges, and one charge can be settled by several payments. The unallocated part remains visible as an advance or free balance of the appropriate purpose. Reimporting a bank transaction checks its external identifier and does not increase the payment twice.

## Documents and lifecycle

Documents pass through draft, approval, confirmation and posting states. Drafts can be edited. After posting, material fields are fixed; errors are corrected through a linked adjustment document.

A return with a discrepancy includes the driver's declared quantity, the warehouse's confirmed quantity, condition, evidence and decision. The agreed portion of a partially confirmed receipt can be posted while the remainder stays open. Every item still needs a defined location or investigation status; items must not disappear from accounting.

A signature image or code confirmation can serve as a user's acceptance confirmation. Legally significant electronic document exchange requires a separate integration with verified signature and retention requirements; an ordinary “Sign” button is not assigned those properties.

## Journal and period closure

The financial service will maintain immutable posted records. A balanced management ledger is proposed: debit and credit lines of one operation must balance within the same currency. Specific accounts and recognition rules require later agreement with the accountant and are not prescribed statutory entries in this concept.

Each entry links to its document, business operation, author and posting time. A repeated event with the same identifier returns the previous result. Posted charges cannot be deleted through the interface; reversals retain a link to the original.

After period closure, new entries dated within that period are blocked or routed through an authorized correction procedure. A delayed offline return retains its observed time, server receipt time and permitted posting date. Permissions and decisions to reopen a period are recorded in the audit history.

## Reconciliation and accounting integration

A reconciliation statement shows opening balances, movements, adjustments and closing balances separately for containers, financial charges and deposits. Users can open any line and inspect its supporting documents. Counterparties can agree or identify a discrepancy against a specific line.

CSV/XLSX exports and readable documents are sufficient for the MVP. The pilot selects one actual accounting system, such as the company's 1C configuration if confirmed. Its connector has delivery statuses, external identifiers, retries and total reconciliation. Successfully sending a file does not imply successful posting in the external system.

[Next — logistics and the live supplier map](04-logistics-and-live-map.md).
