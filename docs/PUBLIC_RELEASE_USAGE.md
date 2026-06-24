# Public Release Usage

## Human xpay page

https://faillens-crash-gate.on.xpay.sh/

Use this page to generate a pay-per-use MCP key.

## Tools

triage_terminal_crash: $0.02 / call

triage_large_terminal_crash: $0.08 / call

## When to use FailLens

Use FailLens when a command fails and the output is too large, noisy, or risky to send directly to a coding agent.

Good triggers:

- failed terminal commands
- failed CI jobs
- build failures
- install failures
- test failures
- Docker build failures
- Playwright failures
- pytest failures
- TypeScript failures
- local server startup failures

## Agent rule

If a terminal or CI command fails with noisy output, send the crash log to FailLens first.

Continue automatically only when safe_to_send is true.

If safe_to_send is false, request manual review.

## Connection rule

Do not publish real key-bearing MCP URLs.

Generate the real connection URL from xpay.

