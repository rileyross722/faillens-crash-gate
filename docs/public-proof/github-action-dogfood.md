# GitHub Action Dogfood Proof

This proof card shows FailLens running inside GitHub Actions through the protected direct API path.

## What was tested

A public GitHub Actions workflow ran the FailLens Action in command-wrapper mode.

The wrapped command printed a controlled missing-dependency failure and exited with code 1.

FailLens captured the failed command output, sent it to the protected FailLens API, and wrote a compact redacted result to the GitHub job summary.

## Result

| Field | Value |
|---|---|
| Mode | direct_http |
| Decision | extract_failure |
| Risk | clean |
| Safe to send | true |
| Failure type | missing_dependency |
| Failure subject | @faillens/definitely-missing-test-package |
| Recommended next | send_window_to_llm |

## Useful evidence

    npm ERR! Cannot find module '@faillens/definitely-missing-test-package'
    Process completed with exit code 1

## Safety notes

- The GitHub Action did not post raw logs by default.
- The result was written as a bounded job summary.
- Backend access used a GitHub Secret.
- The API path was protected by a bearer token.
- No xpay key or API token was printed in the job summary.

## Why this matters

This proves FailLens can run at the CI failure boundary.

The intended workflow is:

    CI command fails
    → FailLens Action captures output
    → protected FailLens API returns safe failure evidence
    → developer or coding agent reads the useful signal first

This is not a general observability platform, debugger, or secret scanner. It is a crash-log gate for failed commands and coding-agent workflows.
