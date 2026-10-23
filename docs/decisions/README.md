# My architectural decisions

| Decision                              | Reason                                                                 | Consequence                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Separate current Auth application     | Identity has a clear ownership boundary and can run independently      | The present code is one service, not an already completed multi-service business system       |
| PostgreSQL with TypeORM               | Identity relations and refresh transactions require consistent updates | I prepare production schemas separately; development synchronize is not a deployment strategy |
| Standard ConfigService and validation | I use supported framework facilities and typed, validated settings     | Environment conversion happens in the loader; consumers use getOrThrow                        |
| bcrypt and jsonwebtoken               | Password hashing and JWT operations use established libraries          | Library use does not replace access-control checks or session design                          |
| Rotating refresh family               | I detect reuse while keeping an absolute session lifetime              | Clients serialize refresh; access JWT remains valid until exp                                 |

These decisions are present in the implementation. Supervisor acceptance remains a separate, factual review record. I compare the main alternatives in the [technology review](../research/technology-comparison.md).
