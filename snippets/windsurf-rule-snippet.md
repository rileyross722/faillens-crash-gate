# Windsurf Rule Snippet: FailLens Crash Gate

Use FailLens as the first crash-log gate when a command fails with noisy output.

Use this rule when:

- npm, pnpm, or yarn install fails
- TypeScript build fails
- pytest fails
- Playwright fails
- Docker build fails
- local server startup fails
- CI logs are long/noisy
- output may contain secret-like values

Continue automatically only when safe_to_send is true.

If safe_to_send is false, stop and ask for manual review.

Human xpay key page:

https://faillens-crash-gate.on.xpay.sh/

