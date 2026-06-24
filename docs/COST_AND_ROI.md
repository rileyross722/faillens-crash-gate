# Cost and ROI

FailLens is priced per call because the value is tied to a specific failure moment.

A normal crash triage call costs:

    $0.02

A large crash triage call costs:

    $0.08

## What FailLens helps avoid

The expensive part is usually not the FailLens call.

The expensive part is:

- coding agents sending thousands of noisy log lines into model context
- repeated wrong retries
- developer time spent scrolling CI output
- raw logs being sent onward with secret-looking values
- repeated CI/debugging loops
- slow failure handoff between terminal output and agent reasoning

## The simple value argument

FailLens is not selling a report.

It is selling a cleaner failure handoff:

    failed command -> redacted bounded evidence -> agent-safe next step

If FailLens saves even one unnecessary agent retry, one large raw-log prompt, or a few minutes of debugging, the $0.02 or $0.08 call is usually easier to justify.

## Use your own numbers

A simple estimate:

    estimated saved cost =
      avoided agent/model cost
      + avoided developer time
      + avoided CI/debugging friction
      + avoided secret-review risk

FailLens does not guarantee savings on every call.

It is designed to make the common crash-log handoff cheaper, safer, and easier for coding agents to act on.

## Example

Without FailLens:

    agent reads a huge raw log
    agent burns context
    agent may miss the actual failure
    agent may retry the wrong command
    developer may still need to inspect the log manually

With FailLens:

    agent pays $0.02 or $0.08
    FailLens returns the bounded failure evidence
    agent reasons over the useful part
    safe_to_send tells the agent whether it can continue automatically

## Practical rule

Use FailLens when the raw log is large, noisy, repetitive, secret-risky, or likely to confuse the agent.

Do not use FailLens when the failure is already obvious and small.
