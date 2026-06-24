# Public Proof Library

FailLens is easiest to understand through before/after examples.

## Pattern

    raw noisy log
    -> FailLens Crash Gate
    -> safe structured failure evidence

## Example 1: npm missing dependency

Raw log excerpt:

    npm ERR! Cannot find module @stripe/stripe-js
    Process completed with exit code 1

FailLens result:

    decision: extract_failure
    risk: clean
    failure.type: missing_dependency
    failure.subject: @stripe/stripe-js
    safe_to_send: true
    recommended_next: send_window_to_llm

Why it helps:

    The agent does not need the entire install/build log.
    It needs the bounded failure evidence and safe_to_send decision.

## Example 2: hosted payloadFile safety

Hosted request shape:

    payloadFile="/etc/hosts"

FailLens result:

    decision: unknown
    safe_to_send: false
    error: payload_file_not_allowed
    recommended_next: retry_with_payload_or_payload_chunks

Why it helps:

    Hosted callers can send large log content, but they cannot make the hosted service read server-side file paths.

## Example 3: large log route

Tool:

    triage_large_terminal_crash

Use case:

    large CI logs
    noisy browser test failures
    Docker build spam
    monorepo build failures

Expected value:

    The agent receives the relevant bounded failure window instead of the entire log.
