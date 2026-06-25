# OmniRoute #5006: packaged route failure from bundled build path

## Status

**Source:** Already-public GitHub issue  
**Source URL:** https://github.com/diegosouzapw/OmniRoute/issues/5006  
**Input type:** Public issue details  
**Hosted smoke status:** Passed  
**Endorsement status:** This is not an OmniRoute endorsement  

---

## Failure shape

The public issue describes a packaged/global install where an onboarding endpoint returns HTTP 500:

    GET /api/system/env/repair

The useful root cause is not just that a server route failed. The signal is that bundled runtime code preserved a build-machine path through `createRequire(import.meta.url)`.

---

## FailLens result

| Field | Result |
|---|---|
| Decision | `extract_failure` |
| Risk | `clean` |
| Safe to send onward | `true` |
| Failure type | `bundled_build_path_error` |
| Failure subject | `createRequire(import.meta.url) build-machine path` |
| Recommended next action | `send_window_to_llm` |
| Secrets detected | `0` |

---

## Sanitized failure signal

    Endpoint:
    GET /api/system/env/repair

    Observed:
    HTTP 500 at module-load time

    Root-cause signal:
    bundled route imports a build-time helper

    Helper runs at module init:
    const require = createRequire(import.meta.url)

    Bundled runtime path:
    file://<build-machine-path>/scripts/dev/sync-env.mjs

    Runtime failure:
    TypeError: filename must be a file URL object,
    file URL string, or absolute path string

    Result:
    route module fails to load
    every request to the repair endpoint returns 500

---

## Compact summary

FailLens reduced the issue to this core signal:

    Packaged route loads bundled helper
    -> helper runs createRequire(import.meta.url) at module init
    -> import.meta.url resolves to build-machine path
    -> runtime machine cannot resolve that path
    -> route module fails to load
    -> endpoint returns HTTP 500

The useful evidence is:

    /api/system/env/repair
    HTTP 500
    createRequire(import.meta.url)
    build-machine path
    TypeError
    module-load failure

---

## Why this helps an agent

An AI coding agent should not treat this as a generic HTTP 500 or generic TypeError.

The bounded failure signal points to a packaged runtime import problem:

    avoid top-level createRequire(import.meta.url) in bundled route code
    avoid packaged runtime dependency on build-machine paths
    resolve helper paths from deployed/runtime location instead

---

## Safety notes

- No secrets were detected.
- Build-machine paths were generalized.
- Local user paths were not included.
- Source material was already public.
- This is a FailLens extraction example, not an OmniRoute endorsement.
