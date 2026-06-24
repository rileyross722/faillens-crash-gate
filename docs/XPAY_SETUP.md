# FailLens xpay Setup

Use this guide to connect FailLens Crash Gate through xpay.

## 1. Open the xpay page

    https://faillens-crash-gate.on.xpay.sh/

## 2. Generate a pay-per-use key

Use the xpay page to generate a pay-per-use key.

Do not publish or commit the generated key-bearing MCP URL.

## 3. Connect the MCP URL

Use the generated MCP URL in your MCP-compatible client.

Use placeholders in public docs:

    https://faillens-crash-gate.mcp.xpay.sh/mcp?key=YOUR_XPAY_KEY

## 4. Use the right tool

Normal logs:

    triage_terminal_crash

Large or very noisy logs:

    triage_large_terminal_crash

## 5. Send log content

Hosted usage should send log content using one of:

    payload
    rawPayload
    payloadBase64
    payloadChunks
    payloadBase64Chunks
    log
    logs
    text
    input
    data

Do not send hosted payloadFile.

Hosted payloadFile is rejected because remote callers must not be able to make the hosted service read server-side file paths.

## 6. Respect safe_to_send

If FailLens returns:

    safe_to_send: true

the returned failure window is safe to send onward to the coding agent.

If FailLens returns:

    safe_to_send: false

stop and review manually.

## Billing note

xpay may charge for a tool call before the hosted service validates the request.

Invalid hosted calls may still be charged.

Use payload, payloadBase64, payloadChunks, or payloadBase64Chunks for hosted calls.
