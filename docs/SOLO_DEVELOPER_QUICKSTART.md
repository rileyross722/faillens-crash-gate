# Solo Developer Quickstart

Use FailLens when your coding agent or terminal produces a noisy failed log.

## Step 1: Get xpay access

Open:

    https://faillens-crash-gate.on.xpay.sh/

Generate a pay-per-use key.

Do not commit the generated key-bearing MCP URL.

## Step 2: Add FailLens to your MCP client

Use the generated MCP URL from xpay.

Use placeholders in public notes:

    https://faillens-crash-gate.mcp.xpay.sh/mcp?key=YOUR_XPAY_KEY

## Step 3: Use the right tool

Normal failed logs:

    triage_terminal_crash

Large or very noisy failed logs:

    triage_large_terminal_crash

## Step 4: Send log content

For hosted usage, send log content through:

    payload
    payloadBase64
    payloadChunks
    payloadBase64Chunks

Do not send hosted payloadFile.

## Step 5: Follow safe_to_send

If FailLens returns:

    safe_to_send: true

the returned failure window is safe to send onward to the coding agent.

If FailLens returns:

    safe_to_send: false

stop and review manually.

## When not to use FailLens

Do not use FailLens when:

- the failure is already obvious
- the log is tiny
- you do not want to pay for the call
- the log contains sensitive material you are not allowed to process

## Simple rule

Use FailLens when a failed log is too noisy, too large, or too risky to paste raw into an agent.
