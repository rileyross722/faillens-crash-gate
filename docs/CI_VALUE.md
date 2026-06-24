# CI Value

FailLens is useful when CI fails and produces a noisy log.

CI logs often include progress spam, repeated warnings, install noise, test output, stack traces, and final failure lines buried near the bottom.

FailLens turns that into a smaller safe failure handoff.

## CI failure workflow

Without FailLens:

    CI fails
    developer opens giant log
    agent may read too much raw output
    useful failure line is buried
    retry may be wrong

With FailLens:

    CI fails
    log content goes to FailLens
    FailLens returns safe bounded evidence
    agent or developer reads the relevant failure window
    next action is clearer

## Best CI use cases

Use FailLens for:

- GitHub Actions failures
- npm or pnpm install failures
- TypeScript build failures
- Docker build failures
- Playwright failures
- pytest failures
- large test logs
- monorepo build logs
- secret-risky crash output

## Normal vs large route

Use:

    triage_terminal_crash

for normal failed logs.

Use:

    triage_large_terminal_crash

for large or very noisy CI logs.

## Important hosted rule

Hosted xpay/MCP accepts log content.

Hosted xpay/MCP rejects payloadFile.

Rule:

    Large log content: yes.
    Remote server file path: no.

## Future CI path

The future CI path is a thin GitHub Action that captures failed command output locally and sends the log content to FailLens.

The public docs repo is not the final GitHub Action repo yet.
