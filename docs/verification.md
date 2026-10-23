# My verification plan

I separate static checks from live API acceptance. I do not create test files, a test runner or a test command in this milestone.

From services I run:

```powershell
pnpm build
pnpm typecheck
pnpm lint
pnpm format:check
pnpm audit --prod
```

| ID   | My manual scenario                                                   | Expected outcome                                                              |
| ---- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| V-01 | Register with valid input, duplicate email and disabled registration | Transactional creation, no partial duplicates, forbidden action when disabled |
| V-02 | Login with valid, incorrect and inactive credentials                 | Correct session or generic failure; no secret exposure                        |
| V-03 | Call protected API with valid, expired and invalid JWT               | Valid access or 401                                                           |
| V-04 | Rotate refresh, reuse old token, attempt concurrent refresh          | Single-use rotation and family revocation on replay                           |
| V-05 | Logout and attempt another refresh                                   | Further refresh denied; existing JWT expires normally                         |
| V-06 | Read own profile                                                     | Safe active-user data                                                         |
| V-07 | Create users as ADMIN, OPERATOR and AUDITOR                          | Only ADMIN succeeds in their organization                                     |
| V-08 | Check settings, health, logs and request IDs                         | Valid types, dependency readiness and no secret leakage                       |
| V-09 | Follow setup from a clean checkout                                   | Frozen installation, build and documented startup work                        |

For a live run I record the commit SHA, date, environment, inputs, observed responses and unresolved issues without publishing secrets. Build success does not establish transactional or concurrent behavior. I do not report user interviews, supervisor approval or performance results without their records.

My release tag follows actual acceptance; an unavailable Docker run remains an explicit open check.

## Target-project evaluation

After implementing the business workflow I compare it with B0, an online-only capture scenario without a local queue, and B1, a timestamp last-write-wins model without explicit conflict review. These are proposed control models, not existing benchmark implementations or claims about commercial systems.

I propose a synthetic dataset of 1,000 assets, three locations and two devices. I run normal delivery, ten repeats of the same operation, competing intentions from one initial state, client restart, and 60 seconds without network. I repeat each profile three times and record commit SHA, CPU/RAM, component versions, input data and network conditions.

I measure retained intentions, duplicate business effects, identified conflicts, hidden intentions, capture response time and end-to-end reconciliation delay. Correctness targets are zero lost accepted intentions, one effect per valid repeated operation and all deliberately incompatible pairs remaining explainable. Latency thresholds require agreement before the experiment; I do not publish invented measurements.

This plan covers planned requirements FR-08 through FR-12 and NFR-05. The current Auth checks do not establish those results.
