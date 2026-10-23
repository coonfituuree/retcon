# My project workflow

I work on Retcon individually. I track work in [YouTrack](https://coonfituuree.youtrack.cloud/) and link actual issue IDs to changes.

I use commit messages in the form `RET-<number>: describe the result` and branches such as `RET-8-config-service`. A commit becomes visible in YouTrack after the GitHub VCS integration is configured and its issue reference is recognized. [JetBrains instructions](https://www.jetbrains.com/help/youtrack/cloud/github-integration.html).

I keep main as the reviewed baseline, use focused changes and document checks in pull requests. For substantial decisions I record actual supervisor feedback. I do not mark a task complete merely because source code exists.

From services I run build, typecheck, lint, format:check and audit --prod. I update documentation when contracts or configuration change. I keep passwords, keys, local .env files and personal interview data out of Git.

I identify submission snapshots with prob-period-1, pre-defense-2 and final-pre-defense, creating each at its actual stage. A tag identifies a concrete revision; it does not replace acceptance evidence. I record open requirements and review outcomes alongside it.
