# Example: Large Noisy CI

## Input shape

thousands of repeated progress lines
warnings
cache output
build chatter
sh: 1: turbooooo: not found
Error: Process completed with exit code 127.

## FailLens result shape

decision: extract_failure
failure_type: command_not_found
failure_subject: turbooooo
safe_to_send: true
window: bounded around the actual failure
noise_removed: repeated progress/log chatter

