# My existing-system comparison

I compare four relevant products against eight consistent criteria using public vendor material. I have not deployed these products or independently measured their performance. “Unconfirmed” means the selected material does not establish a capability, not that the product lacks it.

| Criterion                                          | Odoo Inventory [A1]              | SAP RPM [A2]                     | TrackOnline [A3]             | Reath [A4]                                  |
| -------------------------------------------------- | -------------------------------- | -------------------------------- | ---------------------------- | ------------------------------------------- |
| Reusable-packaging focus                           | General inventory                | Returnable packaging             | Returnable asset pooling     | Reusable packaging                          |
| Individual identification                          | Serial numbers                   | Serialized materials             | RFID tags                    | Item/batch machine-readable codes           |
| Movement traceability                              | Serial-number history            | Packaging movements              | Asset transactions           | Activity timeline                           |
| Locations/partners                                 | Inventory locations              | Location/exchange partners       | Pool customers and locations | Location updates; partner model unconfirmed |
| Scanning                                           | Barcode support                  | Unconfirmed in selected material | RFID/scanners                | QR, NFC, RFID, barcode                      |
| Integration                                        | Unconfirmed in selected material | SAP ERP master data              | REST API                     | Unconfirmed in selected material            |
| Offline capture and later upload                   | Unconfirmed                      | Unconfirmed                      | Unconfirmed                  | Unconfirmed                                 |
| Explicit stale-version conflict and decision audit | Unconfirmed                      | Unconfirmed                      | Unconfirmed                  | Unconfirmed                                 |

The market already provides identification and traceability. I do not claim that Retcon invents asset tracking or that competing systems lack offline support. My project focuses on specifying and evaluating delayed operations, duplicate delivery and explainable discrepancy handling. Its present implementation is Identity, not a completed competing inventory product.

I would investigate uncertain capabilities with the same demonstration: two offline devices record incompatible movements, then retry uploads after a lost response. I would inspect retained intentions, state changes and decision history. Price and throughput require comparable proposals and environments.

- **A1:** Odoo 19 [serial numbers](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/product_management/product_tracking/serial_numbers.html), [Barcode](https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/barcode/setup/serial_numbers_lots.html).
- **A2:** SAP [master data](https://learning.sap.com/courses/managing-basic-business-scenarios-in-sap-returnable-packaging-management/outlining-master-data-and-configuration-1), [pooled packaging](https://help.sap.com/docs/SAP%20RETURN%20PACK%20MGMT%20OD/a1d606cd0d5740aaba0b9c17052ee478/73ccef374da54fa3824608ae815ebeeb.html).
- **A3:** TrackOnline [pooling solutions](https://trackonline.com/solutions/pooling/).
- **A4:** Reath [reusable-packaging traceability](https://reath.id/solutions/reusable-packaging-traceability).
