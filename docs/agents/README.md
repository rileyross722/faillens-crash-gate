# FailLens Agent Setup

Use these rules to tell coding agents when to call FailLens Crash Gate.

## Universal rule

When a terminal command, build, test, install, Docker build, Playwright run, pytest run, TypeScript compile, local server start, or CI job fails and produces noisy logs, call FailLens Crash Gate before reasoning over the full raw log.

Use:

    triage_terminal_crash

for normal failed logs.

Use:

    triage_large_terminal_crash

for large or very noisy failed logs.

Only continue automatically when:

    safe_to_send: true

If FailLens returns:

    safe_to_send: false

stop and ask for manual review.

## MCP URL

Generate your MCP URL from:

    https://faillens-crash-gate.on.xpay.sh/

Do not commit real key-bearing URLs.

Use placeholders only:

    https://faillens-crash-gate.mcp.xpay.sh/mcp?key=YOUR_XPAY_KEY

## Good triggers

Use FailLens when output contains:

- npm ERR
- pnpm ERR
- Cannot find module
- Module not found
- Traceback
- TypeError
- ReferenceError
- Process completed with exit code 1
- Docker build failed
- Playwright timeout
- Playwright executable missing
- pytest failure
- TypeScript compile error
- EADDRINUSE
- port already in use
- out of memory
- secret-looking values
