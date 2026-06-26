# FailLens GitHub Action

FailLens Crash Gate can run inside GitHub Actions to triage failed command, CI, MCP, and agent-tool output.

The action is a thin connector. It does not contain the private FailLens core.

For CI workflows, use protected direct API mode:

    faillens_api_url: ${{ secrets.FAILLENS_API_URL }}
    faillens_api_token: ${{ secrets.FAILLENS_API_TOKEN }}

The xpay MCP route remains useful for MCP agents and local agent tooling, but it is not the recommended GitHub Action transport yet.

## Modes

### 1. Command wrapper mode

Use this when you want FailLens to run a command, capture its output, and triage the output only if the command fails.

Example:

    - name: Run tests through FailLens
      uses: rileyross722/faillens-crash-gate@v0.1.0
      with:
        command: npm test
        faillens_api_url: ${{ secrets.FAILLENS_API_URL }}
        faillens_api_token: ${{ secrets.FAILLENS_API_TOKEN }}

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
      uses: rileyross722/faillens-crash-gate@v0.1.0
      with:
        log_file: faillens.log
        faillens_api_url: ${{ secrets.FAILLENS_API_URL }}
        faillens_api_token: ${{ secrets.FAILLENS_API_TOKEN }}

## Inputs

| Input | Required | Description |
|---|---:|---|
| command | no | Command to run and capture. |
| log_file | no | Existing log file to triage. |
| faillens_api_url | yes for CI | Protected FailLens API URL. Store this in GitHub Secrets. |
| faillens_api_token | yes for CI | FailLens API token. Store this in GitHub Secrets. |
| xpay_mcp_url | no | Experimental MCP transport for local/MCP agent flows, not recommended for GitHub Actions yet. |
| large | no | Use large-log route. |
| source | no | Source label. Default: github_actions. |
| context_budget | no | Context budget for returned evidence. |
| quiet | no | Suppress raw command output. Default: true. |
| fail_on_command_failure | no | Preserve command failure exit code in command mode. Default: true. |
| max_xpay_bytes | no | xpay CLI mode safety cap. Use direct API mode for CI logs. |

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

## Current MVP guidance

Use direct API mode for GitHub Actions and CI workflows.

Use xpay MCP for MCP agents and local agent tooling.

Do not use hosted payloadFile with xpay MCP. Hosted FailLens accepts log content, not remote file paths.
