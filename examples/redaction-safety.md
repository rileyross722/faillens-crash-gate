# Example: Redaction Safety

## Input shape

A crash log contains secret-looking authentication material.

A build then fails with a dependency or runtime error.

## FailLens result shape

decision: redact
risk: high
safe_to_send: false
redaction: secret-looking values are not forwarded raw
likely_next: redact_then_retry

## Note

This public example does not include fake or real secret tokens.

