# After: Command not found

## FailLens result

- decision: extract_failure
- risk: clean
- safe_to_send: true
- failure_type: command_not_found
- failure_subject: turbooooo
- likely_next: install_or_fix_command_path
- tier: normal

## Rendered signal

    decision{extract_failure}
    risk{clean}
    payload_type{ci_crash}
    failure{type:command_not_found,subject:turbooooo,likely_next:install_or_fix_command_path,confidence:0.86}
    anchors{unknown_anchor,exit_code}
    window{lines:2,start:1,end:2,confidence:0.93}
    evidence{sh: 1: turbooooo: not found | Error: Process completed with exit code 127.}
    noise_removed{ansi:0,timestamps:0,progress:0,duplicates:0,blank:1}
    secrets{none}
    safe_to_send{true}
    recommended_next{send_window_to_llm}
    window_text_begin
    sh: 1: turbooooo: not found
    Error: Process completed with exit code 127.
    window_text_end
