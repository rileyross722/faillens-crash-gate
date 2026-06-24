# Invalid Calls and Billing

FailLens Crash Gate is exposed through xpay for pay-per-use MCP calls.

xpay may charge for a tool call before the hosted service validates the request body.

This means invalid hosted calls may still be charged.

## Example invalid hosted call

    payloadFile="/etc/hosts"

Hosted payloadFile is rejected because remote callers must not be able to make the hosted service read server-side file paths.

Expected response:

    safe_to_send: false
    error: payload_file_not_allowed
    recommended_next: retry_with_payload_or_payload_chunks

## Correct hosted usage

Send log content using:

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

## Rule

    Large log content: yes.
    Remote server file path: no.
