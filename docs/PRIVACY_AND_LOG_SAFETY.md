# Privacy and Log Safety

FailLens is built for crash-log triage, not raw log storage.

## Default posture

- Raw logs are not stored by default.
- Local CLI usage does not phone home by default.
- GitHub Action usage does not phone home by default.
- Hosted MCP/xpay usage may produce metadata-only usage events.
- safe_to_send=false means manual review.

## Metadata-only hosted usage

Hosted usage metadata may include operational fields such as:

- tool name
- timestamp
- payload size range
- failure type
- safe_to_send status
- risk level
- source label

It should not include:

- raw logs
- private source code
- private repository contents
- full evidence window text
- secrets
- key-bearing URLs

## Redaction

FailLens detects secret-looking values and returns a redacted bounded failure window.

Redaction is a safety layer, not a replacement for a full repository secret scanner.

## Manual review rule

If safe_to_send=false, do not automatically forward the output to another model or agent.

Request manual review first.

