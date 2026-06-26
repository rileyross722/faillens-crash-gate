# FailLens GitHub Action

FailLens Crash Gate can run inside GitHub Actions to triage failed command, CI, MCP, and agent-tool output.

The action is a thin connector. It does not contain the private FailLens core.

It captures a failed command or reads a log file, sends the output to FailLens, and writes a compact redacted result to the GitHub job summary.

## Modes

### 1. Command wrapper mode

Use this when you want FailLens to run a command, capture its output, and triage the output only if the command fails.

Example:

    - name: Run tests through FailLens
      uses: rileyross722/faillens-crash-gate@main
      with:
        command: npm test
        xpay_mcp_url: ${{ secrets.FAILLENS_XPAY_MCP_URL }}

### 2. Log file mode

Use this when your workflow already captures a log file.

Example:

    - name: Run tests and capture log
      id: test
      shell: bash
      run: |
        set +e
        npm test 2>&1 | tee faillens.log
        echo "exit_code=${PIPESTATUS[0]}" >> "$GITHUB_OUTPUT"

    - name: Triage failed log with FailLens
      if: steps.test.outputs.exit_code != '0'
      uses: rileyross722/faillens-crash-gate@main
      with:
        log_file: faillens.log
        xpay_mcp_url: ${{ secrets.FAILLENS_XPAY_MCP_URL }}

## Inputs

| Input | Required | Description |
|---|---:|---|
| command | no | Command to run and capture. |
| log_file | no | Existing log file to triage. |
| xpay_mcp_url | no | FailLens xpay MCP URL stored in GitHub Secrets. |
| faillens_api_url | no | Optional direct hosted API base URL for private/direct deployments. |
| faillens_api_token | no | Optional bearer token for direct API mode. |
| large | no | Use large-log route. |
| source | no | Source label. Default: github_actions. |
| context_budget | no | Context budget for returned evidence. |
| quiet | no | Suppress raw command output. Default: true. |
| fail_on_command_failure | no | Preserve command failure exit code in command mode. Default: true. |
| max_xpay_bytes | no | xpay CLI mode safety cap. Use direct API mode for larger logs. |

## Outputs

| Output | Description |
|---|---|
| decision | FailLens decision. |
| risk | FailLens risk level. |
| safe_to_send | Whether evidence is safe to forward automatically. |
| failure_type | Detected failure type. |
| failure_subject | Detected failure subject. |
| recommended_next | Suggested next step. |
| triage_json_path | Path to triage JSON file on the runner. |
| log_path | Path to captured/provided log file. |
| exit_code | Wrapped command exit code. |

## Safety behavior

The action does not post raw logs by default.

The GitHub job summary shows compact triage fields.

If safe_to_send is false, the summary tells the user to review manually before sending evidence to an agent or LLM.

## Current MVP limitation

The xpay MCP mode calls FailLens through the MCP tool route and is best for normal-size logs.

For very large logs, use direct hosted API mode or reduce the captured log window until the public paid direct API path is available.

Do not use hosted payloadFile with xpay MCP. Hosted FailLens accepts log content, not remote file paths.
