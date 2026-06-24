# Cursor Rule Snippet: FailLens Crash Gate

Use FailLens when a command fails and the terminal output is too large, noisy, or risky to paste directly into model context.

When a terminal command, build, test, install, Docker build, Playwright run, pytest suite, TypeScript build, local server startup, or CI job fails:

1. Do not send the full raw log to the agent by default.
2. Use FailLens first.
3. Prefer triage_terminal_crash for normal logs.
4. Prefer triage_large_terminal_crash for large or noisy logs.
5. Continue automatically only when safe_to_send is true.
6. If safe_to_send is false, request manual review.

Human xpay key page:

https://faillens-crash-gate.on.xpay.sh/

