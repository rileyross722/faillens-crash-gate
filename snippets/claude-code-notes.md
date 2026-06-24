# Claude Code Notes: FailLens Crash Gate

FailLens Crash Gate is an MCP tool for failed terminal and CI logs.

Use it when a command fails and the output is too large, noisy, or risky to send directly into context.

Suggested server instruction:

Use FailLens when a terminal command, build, test, install, Docker build, Playwright run, pytest suite, TypeScript build, local server startup, or CI job fails and produces noisy logs.

Send the failed log to FailLens before reasoning over the raw output.

Use triage_terminal_crash for normal failures.

Use triage_large_terminal_crash for large or very noisy failures.

Continue automatically only if safe_to_send is true.

If safe_to_send is false, stop and request manual review.

Human xpay key page:

https://faillens-crash-gate.on.xpay.sh/

