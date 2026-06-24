# After: Playwright missing browser

## FailLens result

- decision: extract_failure
- risk: clean
- safe_to_send: true
- failure_type: playwright_browser_missing
- failure_subject: none
- likely_next: install_playwright_browsers
- tier: normal

## Rendered signal

    decision{extract_failure}
    risk{clean}
    payload_type{test_failure}
    failure{type:playwright_browser_missing,likely_next:install_playwright_browsers,confidence:0.9}
    anchors{playwright_missing_browser,exit_code}
    window{lines:5,start:1,end:5,confidence:0.98}
    evidence{Please run npx playwright install | browserType.launch: Executable doesn't exist at /ms-playwright/chromium-1091/chrome-linux/chrome | Process completed with exit code 1 | Running Playwright tests}
    noise_removed{ansi:0,timestamps:0,progress:0,duplicates:0,blank:1}
    secrets{none}
    safe_to_send{true}
    recommended_next{send_window_to_llm}
    window_text_begin
    Running Playwright tests
    browserType.launch: Executable doesn't exist at /ms-playwright/chromium-1091/chrome-linux/chrome
    Looks like Playwright was just installed or updated.
    Please run npx playwright install
    Process completed with exit code 1
    window_text_end
