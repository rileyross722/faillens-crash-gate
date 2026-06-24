# Why xpay First

FailLens uses xpay first because crash-log triage is naturally usage-based.

A coding agent should be able to call FailLens only when a command fails.

That means the simplest buying model is:

    command failed
    log exploded
    agent calls FailLens
    xpay charges cents
    FailLens returns safe failure evidence

## Why this is better than starting with subscriptions

For light users, xpay is cheaper.

A normal FailLens call costs:

    $0.02

A large FailLens call costs:

    $0.08

A developer who only has a few failed logs per month should not need a monthly subscription.

xpay is the low-friction entry point.

## When subscriptions may make sense later

Subscriptions make sense when users want:

- predictable monthly billing
- team usage controls
- invoices
- shared usage visibility
- CI automation
- support
- repo-level configuration
- audit or retention controls

Subscription should not be "the same tools but monthly."

Subscription should mean:

    predictable crash-log triage across agents, CI, and teams

## Current rule

Use xpay first.

Add subscriptions only after repeat usage proves users want budget control, team workflows, or CI automation.
