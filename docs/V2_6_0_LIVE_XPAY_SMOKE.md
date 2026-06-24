# FailLens v2.6.0 Live xpay Smoke Proof

Status: PASS

This document records public-safe v2.6.0 live xpay smoke proof.

Do not commit real xpay MCP URLs, private keys, or wallet details.

## Summary

| Check | Result |
|---|---|
| normal paid xpay route | PASS |
| large paid xpay route | PASS |
| hosted payloadFile rejection | PASS |
| version returned | 2.6.0 |
| unsafe server file read | BLOCKED |

## Normal paid route

Tool:

    triage_terminal_crash

Price observed:

    $0.02

Payload shape:

    payloadBase64

Observed result:

    version: 2.6.0
    decision: extract_failure
    risk: clean
    payload_type: ci_crash
    source: github_actions
    safe_to_send: true
    failure.type: missing_dependency
    failure.subject: @stripe/stripe-js

## Large paid route

Tool:

    triage_large_terminal_crash

Price observed:

    $0.08

Payload shape:

    payloadBase64

Observed result:

    version: 2.6.0
    decision: extract_failure
    risk: clean
    payload_type: ci_crash
    source: github_actions
    safe_to_send: true
    failure.type: missing_dependency
    failure.subject: @stripe/stripe-js
    input.tier: large

## Hosted payloadFile safety rejection

Payload shape:

    payloadFile="/etc/hosts"

Observed result:

    version: 2.6.0
    decision: unknown
    safe_to_send: false
    error: payload_file_not_allowed
    recommended_next: retry_with_payload_or_payload_chunks

## Rule

    Large log content: yes.
    Remote server file path: no.
