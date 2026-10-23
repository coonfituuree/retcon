# My task-to-change traceability

I use the current YouTrack numbering supplied for this delivery: previous RET-1 through RET-20 correspond to RET-3 through RET-22. The shift is two positions, including every dependency reference.

| Current issue                                              | Previous reference | Scope                                                            | Repository evidence                         |
| ---------------------------------------------------------- | ------------------ | ---------------------------------------------------------------- | ------------------------------------------- |
| [RET-3](https://coonfituuree.youtrack.cloud/issue/RET-3)   | RET-1              | Define the Retcon project scope and submission documentation     | Assigned when the task snapshot is prepared |
| [RET-4](https://coonfituuree.youtrack.cloud/issue/RET-4)   | RET-2              | Prepare research materials and Identity requirements             | Assigned when the task snapshot is prepared |
| [RET-5](https://coonfituuree.youtrack.cloud/issue/RET-5)   | RET-3              | Document YouTrack tracking and GitHub traceability               | Assigned when the task snapshot is prepared |
| [RET-6](https://coonfituuree.youtrack.cloud/issue/RET-6)   | RET-4              | Set up the backend workspace and development tools               | Assigned when the task snapshot is prepared |
| [RET-7](https://coonfituuree.youtrack.cloud/issue/RET-7)   | RET-5              | Establish the Auth service and shared backend structure          | Assigned when the task snapshot is prepared |
| [RET-8](https://coonfituuree.youtrack.cloud/issue/RET-8)   | RET-6              | Centralize application configuration with ConfigService          | Assigned when the task snapshot is prepared |
| [RET-9](https://coonfituuree.youtrack.cloud/issue/RET-9)   | RET-7              | Implement the Identity data model with TypeORM                   | Assigned when the task snapshot is prepared |
| [RET-10](https://coonfituuree.youtrack.cloud/issue/RET-10) | RET-8              | Define request DTOs and consistent error handling                | Assigned when the task snapshot is prepared |
| [RET-11](https://coonfituuree.youtrack.cloud/issue/RET-11) | RET-9              | Implement organization and administrator registration            | Assigned when the task snapshot is prepared |
| [RET-12](https://coonfituuree.youtrack.cloud/issue/RET-12) | RET-10             | Implement password authentication and session creation           | Assigned when the task snapshot is prepared |
| [RET-13](https://coonfituuree.youtrack.cloud/issue/RET-13) | RET-11             | Implement RS256 access tokens and protected endpoints            | Assigned when the task snapshot is prepared |
| [RET-14](https://coonfituuree.youtrack.cloud/issue/RET-14) | RET-12             | Implement refresh-token rotation and replay handling             | Assigned when the task snapshot is prepared |
| [RET-15](https://coonfituuree.youtrack.cloud/issue/RET-15) | RET-13             | Implement logout and absolute session expiry                     | Assigned when the task snapshot is prepared |
| [RET-16](https://coonfituuree.youtrack.cloud/issue/RET-16) | RET-14             | Implement the current-user profile and user creation             | Assigned when the task snapshot is prepared |
| [RET-17](https://coonfituuree.youtrack.cloud/issue/RET-17) | RET-15             | Enforce role permissions and organization boundaries             | Assigned when the task snapshot is prepared |
| [RET-18](https://coonfituuree.youtrack.cloud/issue/RET-18) | RET-16             | Configure HTTP protection, logging, and health checks            | Assigned when the task snapshot is prepared |
| [RET-19](https://coonfituuree.youtrack.cloud/issue/RET-19) | RET-17             | Package the Auth service and local infrastructure                | Assigned when the task snapshot is prepared |
| [RET-20](https://coonfituuree.youtrack.cloud/issue/RET-20) | RET-18             | Document the backend architecture, API, and operating procedures | Assigned when the task snapshot is prepared |
| [RET-21](https://coonfituuree.youtrack.cloud/issue/RET-21) | RET-19             | Configure continuous integration and repository checks           | Assigned when the task snapshot is prepared |
| [RET-22](https://coonfituuree.youtrack.cloud/issue/RET-22) | RET-20             | Review the Auth delivery and prepare the submission snapshot     | Assigned when the task snapshot is prepared |

These references follow the issue numbering supplied for the project. Actual issue contents, assignment and GitHub VCS synchronization still require verification in YouTrack. Repository commits do not establish that those external checks or academic acceptance have occurred.

I reorganized an existing project snapshot into task-focused commits using actual commit dates. This history records the reorganization; it does not reconstruct the original dates of implementation, user interviews or review. Some changes share supporting code introduced by an earlier prerequisite.
