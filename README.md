# FailLens Terminal Crash Gate

Safe crash-log triage for coding agents and CI workflows.

Massive crash log -> safe failure evidence -> agent continues.

FailLens turns noisy failed terminal, build, test, install, Docker, Playwright, pytest, TypeScript, local-server, and CI logs into compact, redacted failure evidence.

The goal is simple: stop coding agents from wasting context, credits, and time on terminal sewage.

## Get a pay-per-use key

Use the FailLens xpay page:

https://faillens-crash-gate.on.xpay.sh/

## Tools and pricing

| Tool | Price | Use case |
|---|---:|---|
| triage_terminal_crash | $0.02 / call | Normal failed terminal, build, test, install, Docker, Playwright, pytest, TypeScript, local-server, or CI logs |
| triage_large_terminal_crash | $0.08 / call | Large or very noisy failed logs |

## What FailLens returns

FailLens returns a compact triage result with:

- decision
- risk
- failure_type
- likely_next
- safe_to_send
- redaction signal
- bounded evidence window

## Best for

- failed CI jobs
- noisy terminal failures
- failed npm, pnpm, or yarn installs
- TypeScript build failures
- pytest failures
- Playwright failures
- Docker build failures
- local server startup failures
- coding agents that should not read raw logs directly

## Why this saves money

FailLens can reduce:

- developer time spent scrolling logs
- coding-agent retries
- token and context waste
- unsafe raw-log sharing
- repeated CI/debugging loops

For an active developer, the value is not the few cents per call. The value is avoiding hours of failed-build drag and unnecessary agent-credit burn.

## Safety posture

FailLens is designed as a crash-log gate, not a log warehouse.

- Raw logs are not stored by default.
- Local CLI and GitHub Action usage do not phone home by default.
- Hosted MCP/xpay usage may produce metadata-only usage events.
- safe_to_send=false means manual review.

## What FailLens is not

FailLens is not:

- a full debugger
- Sentry
- Datadog
- Gitleaks
- TruffleHog
- a production observability platform
- a generic context compressor
- a dashboard

It does one narrow job:

failed command -> redacted bounded evidence -> agent-safe next step

## Public proof

See:

- docs/PUBLIC_PROOF_LIBRARY.md
- docs/PRIVACY_AND_LOG_SAFETY.md
- docs/PUBLIC_RELEASE_USAGE.md
- docs/AGENT_SETUP.md

## MCP connection

Generate the MCP connection URL from the xpay page:

https://faillens-crash-gate.on.xpay.sh/

Do not publish real key-bearing URLs.

Public examples may use placeholders only:

https://faillens-crash-gate.mcp.xpay.sh/mcp?key=YOUR_XPAY_KEY

## Repository note

This repository contains public product documentation, proof examples, and setup snippets.

The hosted FailLens service and core implementation are proprietary.

