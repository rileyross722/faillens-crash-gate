# Agent Setup

Use these snippets to tell coding agents when FailLens should be used.

## General routing rule

Use FailLens when a terminal command, build, test, install, Docker build, Playwright run, pytest suite, TypeScript build, local server startup, or CI job fails and produces noisy logs.

Send the failed log to FailLens first.

Use triage_terminal_crash for normal failed logs.

Use triage_large_terminal_crash for large or very noisy failed logs.

Continue automatically only when safe_to_send is true.

If safe_to_send is false, stop and request manual review.

## Human xpay key page

https://faillens-crash-gate.on.xpay.sh/

Do not commit real keys.

