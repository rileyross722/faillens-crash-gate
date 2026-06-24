# Public Proof Library

This library shows the kinds of failures FailLens is designed to triage.

The examples are intentionally safe and do not include real customer logs, real secrets, private repository names, or raw proprietary evidence.

## Proof cases

| Case | Failure type | Value |
|---|---|---|
| npm missing module | missing_dependency | Finds the useful module error without reading the whole log |
| command not found | command_not_found | Detects the failed command and likely next step |
| large noisy CI | command_not_found | Ignores repeated noise and extracts the failure window |
| Playwright missing browser | missing_runtime_dependency | Identifies missing browser/runtime setup |
| redaction safety | redacted_sensitive_value | Shows that secret-looking values are not forwarded raw |

## Core output fields

FailLens returns:

- decision
- risk
- failure_type
- likely_next
- safe_to_send
- evidence
- window_text

## Safety note

Public examples use safe, artificial snippets.

Real user logs should not be published without explicit permission.

