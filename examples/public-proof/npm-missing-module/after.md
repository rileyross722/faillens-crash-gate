# After: NPM missing module

## FailLens result

- decision: extract_failure
- risk: clean
- safe_to_send: true
- failure_type: typescript_module_resolution
- failure_subject: @stripe/stripe-js
- likely_next: install_dependency_or_fix_import
- tier: normal

## Rendered signal

    decision{extract_failure}
    risk{clean}
    payload_type{ci_crash}
    failure{type:typescript_module_resolution,subject:@stripe/stripe-js,likely_next:install_dependency_or_fix_import,confidence:0.93}
    anchors{missing_module,npm_error,exit_code}
    window{lines:9,start:1,end:9,confidence:0.98}
    evidence{src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations. | npm ERR! Exit status 2 | npm ERR! app@1.0.0 build: `vite build` | npm ERR! errno 2}
    noise_removed{ansi:0,timestamps:0,progress:1,duplicates:0,blank:3}
    secrets{none}
    safe_to_send{true}
    recommended_next{send_window_to_llm}
    window_text_begin
    starting build
    > app@1.0.0 build
    > vite build
    src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations.
    npm ERR! code ELIFECYCLE
    npm ERR! errno 2
    npm ERR! app@1.0.0 build: `vite build`
    npm ERR! Exit status 2
    Process completed with exit code 1
    window_text_end
