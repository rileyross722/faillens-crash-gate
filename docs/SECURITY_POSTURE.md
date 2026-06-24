# Security Posture

FailLens Crash Gate is designed as a crash-payload safety gate.

It is not a full secret scanner, repository scanner, SIEM, observability platform, or compliance product.

## Default posture

- Raw logs are not stored by default.
- Hosted usage may create metadata-only usage events.
- Metadata should not include raw logs, evidence text, stack trace bodies, repo contents, or secret values.
- safe_to_send=false means manual review.
- Hosted payloadFile is rejected.

## Hosted payloadFile rule

Hosted callers must not be able to make the hosted service read server-side file paths.

That is why hosted xpay/MCP rejects:

    payloadFile

Correct hosted usage sends log content through:

    payload
    payloadBase64
    payloadChunks
    payloadBase64Chunks

## Redaction

FailLens redacts common secret-looking material in crash payloads.

Examples include:

- bearer tokens
- API-key-like values
- private-key-like blocks
- credential-looking environment values

FailLens redaction reduces risk, but users should still avoid sending sensitive logs when possible.

## What FailLens does not claim

FailLens does not claim to be:

- a complete secret scanner
- a compliance tool
- a data-loss prevention platform
- a production observability tool
- a replacement for Gitleaks, TruffleHog, or other dedicated secret scanners

## Safe operating rule

Use FailLens as a crash-log gate before agent reasoning.

Do not use it as your only security control.
