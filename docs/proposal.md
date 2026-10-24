# My project proposal

**Title:** Retcon (Returnable Containers): a reusable-container tracking system with offline operation capture and synchronization conflict resolution.

I am **Бартай Ғалым Рахымжанұлы**, the sole contributor. My supervisor is **Макатов Арстан Кутжанович**. I maintain the [repository](https://github.com/coonfituuree/retcon) and [YouTrack project](https://coonfituuree.youtrack.cloud/).

## Problem, users and aim

I investigate how to preserve an explainable record of reusable packaging movement when operations arrive late, are retried or describe incompatible changes. I target warehouse operators, accounting administrators and auditors. Their actual working conditions remain subject to user research.

My aim is to build and evaluate an application that captures operations during temporary disconnection and reconciles them without silently hiding incompatible intentions.

## Objectives and results

I research the process and relevant literature, compare alternatives, define acceptance criteria, implement Identity and subsequent accounting/client capabilities, and evaluate retries, concurrent changes and recovery under stated conditions. I deliver code, a reproducible demonstration environment, API contracts, editable diagrams, architectural decisions and recorded evaluation results.

My present implementation is Auth. It covers organizations, roles, users and sessions. The wider business functionality is planned; I do not present it as available code.

## Boundaries

The original milestone includes individual identification, locations, movements, local capture, synchronization and auditable discrepancy handling. Deposits, financial settlement and route planning were deferred from that initial scope. The [expanded future product concept](future/README.md) now includes settlements and an accountant workspace, delivery and collection planning, a live supplier map, and gRPC microservices. A complete ERP, advanced route optimization, RFID hardware and production HA remain separate later considerations. The available implementation remains Auth.

The engineering challenge is preserving accounting meaning across disconnected and concurrent activity. I do not claim new cryptographic primitives or a measured business benefit. Requirements and evidence are developed in the [documentation index](README.md).
