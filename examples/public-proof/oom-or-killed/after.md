# After: OOM or killed process

## FailLens result

- decision: extract_failure
- risk: clean
- safe_to_send: true
- failure_type: oom_or_killed
- failure_subject: none
- likely_next: increase_memory_or_reduce_workload
- tier: normal

## Rendered signal

    decision{extract_failure}
    risk{clean}
    payload_type{ci_crash}
    failure{type:oom_or_killed,likely_next:increase_memory_or_reduce_workload,confidence:0.84}
    anchors{unknown_anchor}
    window{lines:2,start:1,end:2,confidence:0.98}
    evidence{The command was terminated because the process exceeded available memory. | Killed}
    noise_removed{ansi:0,timestamps:0,progress:0,duplicates:0,blank:1}
    secrets{none}
    safe_to_send{true}
    recommended_next{send_window_to_llm}
    window_text_begin
    Killed
    The command was terminated because the process exceeded available memory.
    window_text_end
