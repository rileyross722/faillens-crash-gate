# After: Large noisy CI log

## FailLens result

- decision: extract_failure
- risk: clean
- safe_to_send: true
- failure_type: typescript_module_resolution
- failure_subject: @stripe/stripe-js
- likely_next: install_dependency_or_fix_import
- tier: large

## Rendered signal

    decision{extract_failure}
    risk{clean}
    payload_type{ci_crash}
    failure{type:typescript_module_resolution,subject:@stripe/stripe-js,likely_next:install_dependency_or_fix_import,confidence:0.93}
    anchors{missing_module,npm_error,exit_code}
    window{lines:4,start:1,end:4,confidence:0.98}
    evidence{src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations. | npm ERR! Exit status 2 | Process completed with exit code 1 | ; echo "Starting CI job"\x3b for i in $(seq 1 120)\x3b do echo "progress line $i installing dependencies"\x3b done\x3b echo "src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding …}
    noise_removed{ansi:15,timestamps:0,progress:120,duplicates:0,blank:1}
    secrets{none}
    safe_to_send{true}
    recommended_next{send_window_to_llm}
    window_text_begin
    ;{   echo "Starting CI job"\x3b   for i in $(seq 1 120)\x3b do     echo "progress line $i installing dependencies"\x3b   done\x3b   echo "src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations."\x3b   echo "npm ERR! Exit status 2"\x3b   echo "Process completed with exit code 1"\x3b } > test/fixtures/sample_large_ci_noise.log;418d2d9f-120b-48c3-8352-641393c6ae72Starting CI job
    src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations.
    npm ERR! Exit status 2
    Process completed with exit code 1
    window_text_end
