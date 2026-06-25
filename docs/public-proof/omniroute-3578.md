# OmniRoute #3578: MCP startup failure from missing runtime import

## Status

**Source:** Already-public GitHub issue  
**Source URL:** https://github.com/diegosouzapw/OmniRoute/issues/3578  
**Input type:** Public terminal output  
**Hosted smoke status:** Passed  
**Endorsement status:** This is not an OmniRoute endorsement  

---

## Failure shape

The public issue shows an MCP startup failure after running:

    omniroute --mcp

The command fails during Node.js module resolution while starting the MCP server.

---

## FailLens result

| Field | Result |
|---|---|
| Decision | `extract_failure` |
| Risk | `clean` |
| Safe to send onward | `true` |
| Failure type | `missing_dependency` |
| Failure subject | `src/lib/combos/steps.ts` |
| Recommended next action | `send_window_to_llm` |
| Secrets detected | `0` |

---

## Sanitized failure signal

    $ omniroute --mcp
    Loaded env from <user-home>/.omniroute/.env

    Error [ERR_MODULE_NOT_FOUND]: Cannot find module
    <global-node-modules>/omniroute/src/lib/combos/steps.ts

    imported from:
    <global-node-modules>/omniroute/open-sse/mcp-server/server.ts

    Node.js v24.16.0
    Failed to start MCP server: MCP server exited with code 1

---

## Compact summary

FailLens reduced the issue to this core signal:

    Missing runtime import
    -> MCP server startup failure
    -> server exited with code 1

The useful evidence is:

    ERR_MODULE_NOT_FOUND
    src/lib/combos/steps.ts
    open-sse/mcp-server/server.ts
    MCP server exited with code 1

---

## Why this helps an agent

An AI coding agent does not need the full issue template or full stack trace first.

The bounded failure window tells the agent to inspect whether the published or global OmniRoute package is referencing an unshipped TypeScript source file at runtime.

---

## Safety notes

- No secrets were detected.
- User home paths were generalized.
- Global install paths were generalized.
- Source material was already public.
- This is a FailLens extraction example, not an OmniRoute endorsement.
