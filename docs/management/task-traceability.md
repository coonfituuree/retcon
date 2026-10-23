# My task-to-change traceability

I use the current YouTrack numbering supplied for this delivery: previous RET-1 through RET-20 correspond to RET-3 through RET-22. The shift is two positions, including every dependency reference.

| Current issue                                              | Previous reference | Scope                                                            | Repository evidence                                                                               |
| ---------------------------------------------------------- | ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [RET-3](https://coonfituuree.youtrack.cloud/issue/RET-3)   | RET-1              | Define the Retcon project scope and submission documentation     | [851086d](https://github.com/coonfituuree/retcon/commit/851086d9b981041e43c4e26ed911c89b5dc339d3) |
| [RET-4](https://coonfituuree.youtrack.cloud/issue/RET-4)   | RET-2              | Prepare research materials and Identity requirements             | [ec9a446](https://github.com/coonfituuree/retcon/commit/ec9a4467dad975f147504b2a0eb575699254ec40) |
| [RET-5](https://coonfituuree.youtrack.cloud/issue/RET-5)   | RET-3              | Document YouTrack tracking and GitHub traceability               | [e75149f](https://github.com/coonfituuree/retcon/commit/e75149fe98bd6054cd8fcbf9c5392d7c2a76bfc9) |
| [RET-6](https://coonfituuree.youtrack.cloud/issue/RET-6)   | RET-4              | Set up the backend workspace and development tools               | [3cb6f70](https://github.com/coonfituuree/retcon/commit/3cb6f70627771ff2ca5ec6a6924501e7cf269592) |
| [RET-7](https://coonfituuree.youtrack.cloud/issue/RET-7)   | RET-5              | Establish the Auth service and shared backend structure          | [244aceb](https://github.com/coonfituuree/retcon/commit/244aceb69171d7a7f15bfac8b1343eab23d5967e) |
| [RET-8](https://coonfituuree.youtrack.cloud/issue/RET-8)   | RET-6              | Centralize application configuration with ConfigService          | [0f58e4b](https://github.com/coonfituuree/retcon/commit/0f58e4bf66458e2d9032b2b84dcf5246d899a9eb) |
| [RET-9](https://coonfituuree.youtrack.cloud/issue/RET-9)   | RET-7              | Implement the Identity data model with TypeORM                   | [023f15b](https://github.com/coonfituuree/retcon/commit/023f15bf46d14577f56f93a88c882fc8017cc502) |
| [RET-10](https://coonfituuree.youtrack.cloud/issue/RET-10) | RET-8              | Define request DTOs and consistent error handling                | [d0bf6a9](https://github.com/coonfituuree/retcon/commit/d0bf6a9a0436cd723c0356b263e6573a89802eec) |
| [RET-11](https://coonfituuree.youtrack.cloud/issue/RET-11) | RET-9              | Implement organization and administrator registration            | [7e7602f](https://github.com/coonfituuree/retcon/commit/7e7602fc1591633d1a75d3abc09ed35260d1c5c2) |
| [RET-12](https://coonfituuree.youtrack.cloud/issue/RET-12) | RET-10             | Implement password authentication and session creation           | [539feb6](https://github.com/coonfituuree/retcon/commit/539feb613a99039f83ec32196ede124899cca00f) |
| [RET-13](https://coonfituuree.youtrack.cloud/issue/RET-13) | RET-11             | Implement RS256 access tokens and protected endpoints            | [11c7118](https://github.com/coonfituuree/retcon/commit/11c7118992b1a7a25b3e788296ee8a3f21519d5d) |
| [RET-14](https://coonfituuree.youtrack.cloud/issue/RET-14) | RET-12             | Implement refresh-token rotation and replay handling             | [044aec9](https://github.com/coonfituuree/retcon/commit/044aec9d184302c8720162c2884ac8e801bd12b8) |
| [RET-15](https://coonfituuree.youtrack.cloud/issue/RET-15) | RET-13             | Implement logout and absolute session expiry                     | [aedb062](https://github.com/coonfituuree/retcon/commit/aedb062d4de8d5ecbc146e847d2a24606e791647) |
| [RET-16](https://coonfituuree.youtrack.cloud/issue/RET-16) | RET-14             | Implement the current-user profile and user creation             | [fcaa099](https://github.com/coonfituuree/retcon/commit/fcaa0996cb70a121c1fe70f94e1d7deb395b8c07) |
| [RET-17](https://coonfituuree.youtrack.cloud/issue/RET-17) | RET-15             | Enforce role permissions and organization boundaries             | [7d3d0c6](https://github.com/coonfituuree/retcon/commit/7d3d0c69750aae1291ff01c9f8188520ae601d60) |
| [RET-18](https://coonfituuree.youtrack.cloud/issue/RET-18) | RET-16             | Configure HTTP protection, logging, and health checks            | [976fb13](https://github.com/coonfituuree/retcon/commit/976fb136474d3a12155ecc5503ba9087fcb09f92) |
| [RET-19](https://coonfituuree.youtrack.cloud/issue/RET-19) | RET-17             | Package the Auth service and local infrastructure                | [14c649c](https://github.com/coonfituuree/retcon/commit/14c649c9e65738708e95aa992ae862b601bb55f3) |
| [RET-20](https://coonfituuree.youtrack.cloud/issue/RET-20) | RET-18             | Document the backend architecture, API, and operating procedures | [8a1c562](https://github.com/coonfituuree/retcon/commit/8a1c562a7093c2e4aa1c8478edbfba6a90854fc6) |
| [RET-21](https://coonfituuree.youtrack.cloud/issue/RET-21) | RET-19             | Configure continuous integration and repository checks           | [65e452f](https://github.com/coonfituuree/retcon/commit/65e452f055a55fcf8b3d0752220284139891c8ec) |
| [RET-22](https://coonfituuree.youtrack.cloud/issue/RET-22) | RET-20             | Review the Auth delivery and prepare the submission snapshot     | [prob-period-1](https://github.com/coonfituuree/retcon/tree/prob-period-1)                        |

These references follow the issue numbering supplied for the project. Actual issue contents, assignment and GitHub VCS synchronization still require verification in YouTrack. Repository commits do not establish that those external checks or academic acceptance have occurred.

I reorganized an existing project snapshot into task-focused commits using actual commit dates. This history records the reorganization; it does not reconstruct the original dates of implementation, user interviews or review. Some changes share supporting code introduced by an earlier prerequisite.

## Checks recorded for this snapshot

Backend build, type checking and ESLint passed locally before the history rewrite. The production dependency audit reported no known vulnerabilities. Formatting and the reconstructed source snapshots are checked as part of the rewrite verification. Backend source and frontend files are preserved from the prior snapshot.

Docker is unavailable in the current environment, so Compose startup, database-backed API scenarios and container image execution have not been verified here. No automated tests were added. User discussions and dated supervisor feedback remain outstanding as described in the submission checklist.
