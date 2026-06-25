# FailLens Public Proof Library

## What this is

This folder contains small public proof cards showing how FailLens handles already-public failure logs or issue details.

Each proof card is designed to show:

    the failure shape
    the bounded signal FailLens extracts
    whether the result is safe to send onward
    what an agent should focus on next

These are not endorsements from the source projects.

---

## Current proof cards

| Proof card | Failure type | Source type | Status |
|---|---|---|---|
| OmniRoute #3578 | `missing_dependency` | Already-public GitHub issue terminal output | Hosted smoke passed |
| OmniRoute #5006 | `bundled_build_path_error` | Already-public GitHub issue details | Hosted smoke passed |
| OmniRoute #4091 | `mcp_tool_dispatch_failure` | Already-public GitHub issue details | Hosted smoke passed |

---

## Proof-card boundaries

These proof cards do not claim:

    project endorsement
    maintainer approval
    official bug analysis
    user testimonial
    private access to logs

Acceptable framing:

    FailLens tested against already-public issue output and extracted a bounded failure signal.

---

## Safety rules

Public proof cards must not include:

    xpay keys
    raw secrets
    private repository names
    private company details
    raw user home paths
    unreviewed stack trace dumps
    private prompts
    private logs

Paths and hostnames should be generalized.

Examples:

| Raw shape | Public replacement |
|---|---|
| user home path | `<user-home>` |
| global Node install path | `<global-node-modules>` |
| build machine path | `<build-machine-path>` |
| private project path | `<private-project>` |

---

## Cards

- [OmniRoute #3578: MCP startup failure from missing runtime import](./omniroute-3578.md)
- [OmniRoute #5006: packaged route failure from bundled build path](./omniroute-5006.md)
- [OmniRoute #4091: MCP dispatch failure with schema visible but routed call rejected](./omniroute-4091.md)
