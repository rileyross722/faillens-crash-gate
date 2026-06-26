# After: Secret-bearing crash

## FailLens result

- decision: redact
- risk: high
- safe_to_send: false
- failure_type: missing_dependency
- failure_subject: @stripe/stripe-js
- likely_next: install_dependency_or_fix_import
- tier: normal

## Rendered signal

    decision{redact}
    risk{high}
    payload_type{ci_crash}
    failure{type:missing_dependency,subject:@stripe/stripe-js,likely_next:install_dependency_or_fix_import,confidence:0.91}
    anchors{missing_module,exit_code}
    window{lines:5,start:1,end:5,confidence:0.97}
    evidence{npm ERR! Cannot find module '@stripe/stripe-js' | Process completed with exit code 1}
    noise_removed{ansi:0,timestamps:0,progress:0,duplicates:0,blank:1}
    secrets{database_url,bearer_token}
    safe_to_send{false}
    recommended_next{redact_then_retry}
    window_text_begin
    Running CI job
    DATABASE_URL=[REDACTED_DATABASE_URL]
    Authorization: [REDACTED:bearer_token]
    npm ERR! Cannot find module '@stripe/stripe-js'
    Process completed with exit code 1
    window_text_end
