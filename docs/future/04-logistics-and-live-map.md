# Logistics and the live supplier map

## Why Retcon needs a map

The map must support a specific handover: understanding where a supplier is travelling, when to prepare unloading and which empty containers must be ready for collection. Users will be able to follow a vehicle delivering products with containers, collecting empty containers or doing both at the same stop.

Here, the supplier is a company or delivery participant. The map shows a vehicle or driver device assigned to the trip, not the location of the organization itself. If transport is outsourced, the trip retains the relationship between supplier, carrier and driver.

## From request to trip

An account manager creates a delivery, collection or combined-visit request. It identifies the site, contact, time window, products, outgoing containers and expected return. The recipient can confirm that containers have been assembled and are ready for loading.

The dispatcher groups requests into a trip, assigns a vehicle and driver, and determines stop order. The system checks resource availability, time-window compatibility and input completeness. Each stop retains both its planned action and actual result.

Initially, stop order is set manually, while the road route and approximate travel time come from the selected mapping service. Automatic optimization across several vehicles with constraints is a separate later task, not a prerequisite for introducing the map.

## What appears on the map

| Element           | Information and action                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| Vehicle           | Registration or label, driver, supplier and trip status                   |
| Stop              | Address, time window, delivery, collection or both                        |
| Route             | Planned stop sequence and available road geometry                         |
| Current position  | Coordinate, observed time, received time and accuracy                     |
| Estimated arrival | Time interval or estimate with the last calculation time                  |
| Cargo             | Products being transported, containers to deliver and expected collection |
| Deviation         | Delay, missing fresh position or unavailable site                         |

The dispatcher can open a trip and contact its driver from the vehicle card. A recipient sees its approaching delivery and relevant information rather than the company's entire internal fleet map.

## The driver's mobile workspace

A driver begins by reviewing the assigned trip, checking the vehicle and load list, and confirming readiness to depart. The interface prioritizes large actions: open the next stop, report arrival, record a delivery, record a collection and report a problem.

At a stop, the driver can scan containers, enter actual product quantities, photograph damage and obtain recipient confirmation. A combined visit records delivery and collection separately: 30 crates delivered and 18 collected. The net difference of 12 does not replace those two facts.

Documents are entered while stopped. The interface should not demand continuous interaction while driving. After completing a stop, the driver sees the next destination, while the dispatcher sees the updated status and unresolved issues.

## Coordinate source

For the MVP, the proposed source is geolocation from an active mobile web interface. The browser Geolocation API requires user permission and a secure context; its core methods include `getCurrentPosition()` and `watchPosition()`. These requirements are described in the [Geolocation API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

Continuous operational background tracking requires separate evaluation of a mobile application or GPS-tracker integration. The MVP does not promise that a page opened once will continuously transmit coordinates while the phone is locked. Its behavior must be tested on actual pilot devices.

Initial experimental settings are approximately one position every 15 seconds while moving, with less frequent updates during extended stops. This is a configurable hypothesis to evaluate against battery consumption, connectivity and dispatcher needs. The server limits ingestion frequency and batch size.

## Connectivity loss

Each point includes observed time, server receipt time, accuracy, device ID and a sequence number within its device stream. Without a network connection, coordinates are retained locally within limits and uploaded in batches after recovery.

A late point supplements history but does not move the current marker backward. The server checks device and trip assignment, time range, coordinate validity and abnormal jumps. Suspicious points are marked; inaccurate GPS does not become evidence of a container handover.

The proposed interface marks a position stale after 60 seconds without an update during an active trip. Users see text such as “last position 4 minutes ago.” Without reliable data, ETA is hidden or explicitly identified as an outdated estimate. Exact thresholds are tuned during the pilot.

## Estimated time of arrival

ETA considers the latest usable position, stop order, expected service duration and the selected routing provider's data. A meaningful interval is more useful to a customer than unjustified minute-level precision.

Changing stop order creates a new plan version. The dispatcher can see who changed it and why, while the driver must receive the updated sequence. If the driver is offline, the dispatcher's interface shows that the update has not yet been delivered.

A mapping API outage does not block acceptance or accounting. Users retain the address list, contacts and stop actions; the map and ETA show temporary unavailability.

## Cargo and capacity

Planning considers at least vehicle weight limits, volume or pallet positions and the corresponding cargo properties. Constraints are checked after every stop: unloading frees capacity and return collection fills it again.

For the MVP, calculated utilization and warnings based on populated data are sufficient. The system must not declare a route feasible when dimensions and weights are missing. Stacking, product compatibility and special transport requirements are added for the selected pilot process.

## Arrival and handover confirmation

A geofence around a site can indicate that a vehicle is nearby and suggest an “Arrived” action. It does not automatically post a warehouse operation. Responsible participants and a document confirm handover because a vehicle may drive past the site and GPS may be inaccurate.

If a recipient is absent, the driver records an unsuccessful attempt and its reason. If containers are not ready, the actual collection and remaining request balance are recorded. A repeat visit is a new action that preserves the previous attempt's history.

## Access and privacy

Dispatchers see their company's trips within their permissions. Drivers see assigned trips. Counterparties receive information only about their own stop and the agreed portion of delivery tracking; other customers' addresses, the complete route history and financial data are not disclosed.

A public tracking link, if introduced, is limited by time, trip, exposed fields and revocation. A trip ID alone is not sufficient authorization. Coordinate collection stops at the end of the trip; history retention is governed by a separate policy agreed with the pilot company.

## A complete scenario

In the morning, a supplier creates a trip carrying products and containers. The recipient sees the scheduled visit and reports that 40 empty crates are ready for collection. The dispatcher follows the vehicle, and the customer receives an approaching-vehicle notification. On site, the driver hands over the delivery and collects an actual 37 crates, recording the missing three. Back at the warehouse, acceptance confirms the condition of those 37 units. The accountant sees the updated obligation and the associated basis for deposit calculation.

The map is therefore part of a complete business process: a journey leads to verifiable operations and documents, while any discrepancy remains visible until resolved.

[Next — scenarios and interfaces](05-scenarios-and-ux.md).
