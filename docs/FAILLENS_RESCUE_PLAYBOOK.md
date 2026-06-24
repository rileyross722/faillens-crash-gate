# FailLens Rescue Playbook

FailLens Rescue is the public adoption motion for v2.6.

## Core offer

Send one failed CI or terminal log.

FailLens returns the safe failure window your coding agent should read.

## What to send

Good examples:

- failed CI log
- failed npm or pnpm install log
- failed TypeScript build log
- failed Docker build log
- failed pytest output
- failed Playwright output
- failed local server startup output
- failed command output saved as a file

## What not to send

Do not send:

- production secrets
- private keys
- customer data
- full private repository contents
- logs you are not allowed to share

## Safety note

If the log may contain sensitive material, redact it first.

FailLens redacts secret-looking values, but users should still avoid sending sensitive logs when possible.

## What FailLens returns

FailLens returns:

- decision
- risk
- failure type
- failure subject
- likely next action
- safe_to_send
- bounded evidence window
- redaction signal

## Goal

The v2.6 adoption target is:

- 3 real users
- 10 real failed logs
- 3 repeat users
- 100 real calls or documented runs
- 0 secret leaks
- 1 testimonial or case study
