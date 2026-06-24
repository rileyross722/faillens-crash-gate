# Buyer Objections

This document answers common objections to FailLens Crash Gate.

## Why would I pay for this?

Because the expensive part is usually not the FailLens call.

The expensive part is:

- agent context waste
- wrong retries
- developer time spent scrolling logs
- repeated CI failures
- unsafe raw-log handoff

FailLens costs cents per call and returns the bounded failure evidence an agent should read.

## Why not just use xpay instead of subscription?

Yes.

For now, use xpay.

xpay is the default path because crash triage is naturally usage-based.

Subscriptions may come later for teams that want predictable billing, support, usage visibility, CI automation, or invoices.

## Why not just tail or grep?

Use tail or grep when they are enough.

Use FailLens when you need:

- redaction
- safe_to_send
- structured evidence
- failure type
- likely next action
- agent-ready output
- hosted MCP/xpay access

## Why not use Sentry or Datadog?

Sentry and Datadog are strong production observability and debugging platforms.

FailLens is narrower.

It handles the earlier workflow:

    command failed -> terminal or CI log exploded -> agent needs safe failure evidence

FailLens does not try to replace observability platforms.

## Why not use Gitleaks or TruffleHog?

Gitleaks and TruffleHog are dedicated secret scanners.

FailLens is not trying to replace them.

FailLens performs crash-payload redaction and safe evidence extraction.

## What if the log contains secrets?

FailLens redacts common secret-looking material and returns safe_to_send.

If safe_to_send is false, do not continue automatically.

Review manually.

## What if the failure is obvious?

Do not use FailLens.

FailLens is for noisy, large, repetitive, secret-risky, or agent-confusing failure output.

## Why is payloadFile blocked on hosted xpay/MCP?

Because hosted callers should not be able to make the hosted service read server-side file paths.

Send log content instead.

## What is the practical buying rule?

Use FailLens when the failed log is too noisy, too large, or too risky to send raw to an agent.
