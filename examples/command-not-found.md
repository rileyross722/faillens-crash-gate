# Example: Command Not Found

## Input shape

sh: 1: turbooooo: not found
Error: Process completed with exit code 127.

## FailLens result shape

decision: extract_failure
failure_type: command_not_found
failure_subject: turbooooo
safe_to_send: true
likely_next: check command spelling or install the missing CLI

