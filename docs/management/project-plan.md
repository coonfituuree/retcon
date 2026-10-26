# My project management workflow

The [expanded implementation roadmap](../future/09-delivery-roadmap.md) describes future phases for accounting, settlements, supplier tracking and gRPC microservices. It supplements this current workflow and does not claim that new tracker issues or agreed deadlines already exist.

I work individually: **Бартай Ғалым Рахымжанұлы**. My supervisor is **Макатов Арстан Кутжанович**. I own research, requirements, architecture, implementation, evaluation and documentation.

I manage actual work items in [YouTrack](https://coonfituuree.youtrack.cloud/), project key RET. Each meaningful card needs an owner, expected outcome, priority, acceptance criteria and an agreed target date. The link points to the tracker instance; actual cards, assignments and VCS configuration must be verified there.

I use RET-<number>: message for commits and RET-<number>-description for task branches. I add reciprocal links between issues and commits or PRs. [JetBrains VCS integration instructions](https://www.jetbrains.com/help/youtrack/cloud/github-integration.html).

## Milestones

| Stage                   | Deliverable                                        | Completion evidence                                  |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| Analysis and design     | Proposal, research, requirements and diagrams      | Reviewed documents and actual user evidence          |
| Current foundation      | Auth, local environment, API and checks            | Recorded checks and available API acceptance results |
| Business implementation | Accounting, client and reconciliation capabilities | Requirement-linked scenarios                         |
| Evaluation              | Baselines, metrics, failure/recovery observations  | Reproducible protocols and measured results          |
| Final submission        | Report, demonstrator and presentation              | Reviewed materials and identified limitations        |

The supplied document sets the first submission for 24 October. Later dates follow the university schedule; I do not invent agreed deadlines. I tag exact submission snapshots as prob-period-1, pre-defense-2 and final-pre-defense when those versions are prepared. A tag identifies a revision; it does not certify that open requirements have passed.

I keep main as the baseline and use PRs for subsequent changes. I present significant individual decisions to my supervisor and record actual feedback. The repository history reorganizes an existing snapshot into task-focused commits using actual commit dates; it does not reconstruct earlier development or review activity. I use the current RET-3 through RET-22 numbering recorded in the [task-to-change map](task-traceability.md).

Dependencies include access to users, supervisor availability, source materials, a Docker-capable environment and tracker/repository permissions. The [risk and review record](risks-and-review.md) and [checklist](submission-checklist.md) show unresolved items.
