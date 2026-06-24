# FailLens User Feedback Checklist

Use this checklist after running a real failed log through FailLens.

## Basic questions

1. Was the failure_type correct?
2. Was the failure_subject correct?
3. Was the likely_next action useful?
4. Was the evidence window enough to continue?
5. Did FailLens remove enough noise?
6. Did the result feel safe to send to an agent?
7. Did anything sensitive appear in the output?
8. Would you use FailLens again?
9. Would you install it in an agent or CI workflow?
10. Would you pay for this if it repeatedly saved debugging time?

## Safety questions

1. Did FailLens expose anything that should have been redacted?
2. Was safe_to_send accurate?
3. Should this result have required manual review?
4. Did the returned evidence include too much context?
5. Did the returned evidence miss the important line?

## What not to record

Do not record:

- raw logs
- evidence text
- window_text
- secret values
- private repo names without permission
- customer data
- stack trace bodies
- full command output
