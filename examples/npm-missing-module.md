# Example: npm Missing Module

## Input shape

npm ERR! code MODULE_NOT_FOUND
Error: Cannot find module '@stripe/stripe-js'
Process completed with exit code 1

## FailLens result shape

decision: extract_failure
failure_type: missing_dependency
failure_subject: @stripe/stripe-js
safe_to_send: true
likely_next: install or restore the missing dependency

