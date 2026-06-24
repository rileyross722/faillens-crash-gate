# Why Not Just tail or grep?

Sometimes tail and grep are enough.

If the failure is small and obvious, use them.

Example:

    tail -n 200 crash.log
    grep -i "error\|failed\|cannot find\|traceback" crash.log

FailLens is for cases where raw terminal output is noisy, repetitive, secret-risky, or agent-driven.

## What tail and grep do well

tail and grep are:

- free
- fast
- local
- familiar
- good for humans who know what to search for

FailLens should not pretend those tools are useless.

## What FailLens adds

FailLens adds:

- secret redaction
- safe_to_send decision
- bounded failure window
- failure type
- likely next action
- structured agent-readable output
- normal and large crash-log routes
- hosted MCP/xpay access
- deterministic crash-anchor detection
- privacy posture for hosted usage

## The real difference

tail and grep return text.

FailLens returns a safer failure handoff:

    failed command -> redacted bounded evidence -> agent-safe next step

## Practical rule

Use tail and grep when:

- the log is small
- the failure is obvious
- no agent is involved
- no secret-risky content is present

Use FailLens when:

- the log is huge
- the log is noisy
- the agent might read too much raw output
- the failure signal is buried
- safe_to_send matters
- you want a structured failure object
