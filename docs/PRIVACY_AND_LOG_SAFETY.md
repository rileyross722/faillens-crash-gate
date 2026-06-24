# Privacy and Log Safety

FailLens Crash Gate is designed as a crash-log gate, not a log warehouse.

## Default posture

- Raw logs are not stored by default.
- Hosted xpay/MCP usage may produce metadata-only usage events.
- Metadata should not include raw logs, evidence text, stack trace bodies, repo contents, or secret values.
- safe_to_send=false means manual review.

## Hosted file-path rule

Hosted xpay/MCP rejects payloadFile.

Reason:

    Remote callers must not be able to make the hosted service read server-side file paths.

Use log content instead:

    payload
    payloadBase64
    payloadChunks
    payloadBase64Chunks

## Large logs

Large logs are supported as content.

Rule:

    Large log content: yes.
    Remote server file path: no.

For local workflows, capture the log locally, then send the content or chunks to FailLens.

## Redaction

FailLens performs crash-payload safety redaction for common secret-like material.

It is not a full repository secret scanner.

Do not use FailLens as a replacement for dedicated secret-scanning tools.
