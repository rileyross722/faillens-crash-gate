# OmniRoute #4091: MCP dispatch failure with schema visible but routed call rejected

## Status

**Source:** Already-public GitHub issue  
**Source URL:** https://github.com/diegosouzapw/OmniRoute/issues/4091  
**Input type:** Public issue details  
**Hosted smoke status:** Passed  
**Endorsement status:** This is not an OmniRoute endorsement  

---

## Failure shape

The public issue describes an MCP failure where the server appears healthy:

    initialize succeeds
    tools/list succeeds
    direct tools/call succeeds
    client shows Connected

But routed tool calls fail with:

    No such tool available

FailLens classified this as an MCP dispatch/tool registry problem instead of a generic connection failure.

---

## FailLens result

| Field | Result |
|---|---|
| Decision | `extract_failure` |
| Risk | `clean` |
| Safe to send onward | `true` |
| Failure type | `mcp_tool_dispatch_failure` |
| Failure subject | `search_workflows` |
| Recommended next action | `send_window_to_llm` |
| Secrets detected | `0` |

---

## Sanitized failure signal

    Direct MCP checks succeed.

    initialize succeeds
    tools/list succeeds
    direct tools/call succeeds
    client shows Connected

    Direct tool call target:
    search_workflows

    Routed behavior:
    tool schemas are visible
    routed invocation fails

    Observed failure:
    No such tool available

    Likely failure layer:
    MCP tool-use dispatch / tool registry synchronization

---

## Compact summary

FailLens reduced the issue to this core signal:

    MCP server healthy
    -> schema visible
    -> direct tools/call works
    -> routed tool call fails
    -> No such tool available
    -> dispatch/tool registry mismatch

The useful evidence is:

    tools/list succeeds
    direct tools/call succeeds
    client shows Connected
    No such tool available
    search_workflows
    dispatch layer

---

## Why this helps an agent

An AI coding agent should not start by debugging transport, authentication, or server availability.

The bounded failure signal narrows the investigation:

    MCP server is reachable
    tool schema exists
    direct invocation works
    routed invocation rejects the tool
    inspect gateway/tool-registry/tool-use translation state

---

## Safety notes

- No secrets were detected.
- Credentials were not included.
- Hostnames were generalized.
- Source material was already public.
- This is a FailLens extraction example, not an OmniRoute endorsement.
