# Value for Agent Builders

FailLens is built for coding agents that run commands and then need to recover when those commands fail.

The agent should not dump a huge raw terminal log into its model context every time something crashes.

FailLens gives the agent a crash gate.

## The trigger

Use FailLens when:

    a terminal, build, test, install, Docker, Playwright, pytest, TypeScript, local-server, or CI command fails and produces noisy output

## What the agent receives

FailLens returns:

- decision
- risk
- failure_type
- failure_subject
- likely_next
- safe_to_send
- evidence
- bounded window
- redaction signal

## Why this helps agents

Agents need clear tool triggers.

A vague tool gets ignored.

A clear tool gets called.

FailLens has a clear trigger:

    command failed -> call FailLens before reasoning over raw logs

## Agent behavior rule

Give your agent this rule:

    When a command fails and produces noisy logs, call FailLens Crash Gate before reasoning over the full raw log.

    Use triage_terminal_crash for normal logs.

    Use triage_large_terminal_crash for large or very noisy logs.

    Continue automatically only when safe_to_send is true.

    If safe_to_send is false, stop and ask for manual review.

## Why this saves agent context

Without FailLens:

    agent reads raw log
    agent burns context
    agent may miss the failure
    agent may expose secret-looking content
    agent may retry the wrong command

With FailLens:

    agent gets bounded evidence
    agent sees safe_to_send
    agent gets failure_type and likely_next
    agent continues with less noise
