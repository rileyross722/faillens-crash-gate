# FailLens Crash Gate

Crash-log triage for coding agents.

Massive crash log -> safe failure evidence -> agent continues.

FailLens Crash Gate turns noisy terminal, build, test, install, Docker, Playwright, pytest, TypeScript, local-server, and CI failures into compact redacted evidence that coding agents can safely use.

## What it does

When a command fails and produces a huge noisy log, FailLens helps an agent avoid reading the whole swamp.

It returns:

- bounded failure window
- failure type
- likely next action
- redaction signal
- safe_to_send
- compact structured evidence

## Pay-per-use xpay access

Open:

    https://faillens-crash-gate.on.xpay.sh/

Generate a pay-per-use key.

Then connect the generated MCP URL to your MCP-compatible client or coding agent.

Do not commit real key-bearing MCP URLs.

Use placeholders in docs:

    https://faillens-crash-gate.mcp.xpay.sh/mcp?key=YOUR_XPAY_KEY

## Tools and pricing

| Tool | Price | Use case |
|---|---:|---|
| triage_terminal_crash | $0.02 / call | Normal failed terminal, build, test, install, Docker, Playwright, pytest, TypeScript, local-server, or CI logs |
| triage_large_terminal_crash | $0.08 / call | Large or very noisy failed logs |

## Agent rule

Give your coding agent this rule:

    When a terminal command, install, build, test, Docker build, Playwright run, pytest run, TypeScript compile, local server start, or CI job fails and produces noisy logs, call FailLens Crash Gate before reasoning over the full raw log.

    Use triage_terminal_crash for normal logs.

    Use triage_large_terminal_crash for large or very noisy logs.

    Only send the returned failure window onward automatically when safe_to_send is true.

    If safe_to_send is false, stop and ask for manual review.

## Hosted payload rule

Hosted xpay/MCP accepts log content.

Use:

    payload
    rawPayload
    payloadBase64
    payloadChunks
    payloadBase64Chunks
    log
    logs
    text
    input
    data

Do not use hosted payloadFile.

Hosted payloadFile is rejected because remote callers must not be able to make the hosted service read server-side file paths.

Rule:

    Large log content: yes.
    Remote server file path: no.

## Invalid paid calls

xpay may charge for a tool call before the hosted service validates the payload shape.

That means invalid hosted calls, such as payloadFile, may still be charged.

For hosted usage, send log content using payload, payloadBase64, payloadChunks, or payloadBase64Chunks.


## Why this saves money

A normal FailLens call costs $0.02.

A large FailLens call costs $0.08.

The expensive part is usually not the FailLens call. The expensive part is agent context waste, wrong retries, developer debugging time, repeated CI friction, and unsafe raw-log handoff.

FailLens helps turn a noisy failed command into a small, redacted evidence window that a coding agent can actually use.

See:

- docs/COST_AND_ROI.md

## Example result

Input:

    npm ERR! Cannot find module @stripe/stripe-js
    Process completed with exit code 1

Output shape:

    decision: extract_failure
    risk: clean
    failure.type: missing_dependency
    failure.subject: @stripe/stripe-js
    safe_to_send: true
    recommended_next: send_window_to_llm

## What FailLens is not

FailLens is not:

- Sentry
- Datadog
- Gitleaks
- TruffleHog
- a full debugger
- a production observability platform
- a generic context compressor
- a dashboard

It does one narrow job:

    failed command -> redacted bounded evidence -> agent-safe next step

## Public docs

See:

- docs/XPAY_SETUP.md
- docs/PRIVACY_AND_LOG_SAFETY.md
- docs/PUBLIC_PROOF_LIBRARY.md
- docs/INVALID_CALLS_AND_BILLING.md
- docs/XPAY_PAGE_COPY.md

- docs/V2_6_0_LIVE_XPAY_SMOKE.md

- docs/FAILLENS_RESCUE_PLAYBOOK.md

- docs/FEEDBACK_TEMPLATE.md

- docs/CASE_STUDY_TEMPLATE.md

- docs/USER_FEEDBACK_CHECKLIST.md

- docs/agents/README.md

- examples/public-proof/

## Value and objections

- docs/WHY_XPAY_FIRST.md
- docs/WHY_NOT_TAIL_GREP.md
- docs/AGENT_BUILDER_VALUE.md
- docs/SOLO_DEVELOPER_QUICKSTART.md
- docs/CI_VALUE.md
- docs/SECURITY_POSTURE.md
- docs/BUYER_OBJECTIONS.md
- docs/RELEASE_V2_6_2.md

## Repository note

This repository is the public documentation, setup, and proof shell for FailLens Crash Gate.

The hosted FailLens service and core implementation are proprietary.
