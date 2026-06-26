import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

function input(name, fallback = "") {
  const direct = process.env[`INPUT_${name.toUpperCase()}`];
  const dashed = process.env[`INPUT_${name.toUpperCase().replaceAll("_", "-")}`];
  return (direct ?? dashed ?? fallback).trim();
}

function boolInput(name, fallback = false) {
  const value = input(name, fallback ? "true" : "false").toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

function intInput(name, fallback) {
  const value = Number.parseInt(input(name, String(fallback)), 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function writeOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) return;

  const text = String(value ?? "");

  if (text.includes("\n")) {
    const delim = `FAILLENS_${name.toUpperCase()}_${Date.now()}`;
    appendFileSync(outputPath, `${name}<<${delim}\n${text}\n${delim}\n`);
  } else {
    appendFileSync(outputPath, `${name}=${text}\n`);
  }
}

function appendSummary(markdown) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) {
    console.log(markdown);
    return;
  }

  appendFileSync(summaryPath, `${markdown.trim()}\n\n`);
}

function mask(value) {
  if (!value) return;
  console.log(`::add-mask::${value}`);
}

function shellCommand(command, logPath, quiet) {
  const shell = process.platform === "win32" ? "cmd.exe" : "bash";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", command]
    : ["-lc", command];

  const result = spawnSync(shell, args, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 40
  });

  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  const combined = `${stdout}${stderr ? `\n${stderr}` : ""}`;

  mkdirSync(dirname(logPath), { recursive: true });
  writeFileSync(logPath, combined, "utf8");

  if (!quiet && combined) {
    process.stdout.write(combined);
  }

  return typeof result.status === "number" ? result.status : 1;
}

function parseFastMcpText(output) {
  const field = (name) => {
    const match = output.match(new RegExp(`${name}\\{([^\\r\\n}]*)\\}`, "u"));
    return match ? match[1] : "";
  };

  const failureRaw = field("failure");
  const failure = {};

  if (failureRaw) {
    for (const part of failureRaw.split(",")) {
      const index = part.indexOf(":");
      if (index === -1) continue;
      const key = part.slice(0, index).trim();
      const value = part.slice(index + 1).trim();
      if (key) failure[key] = value;
    }
  }

  return {
    version: "xpay_mcp_text",
    decision: field("decision"),
    risk: field("risk"),
    safe_to_send: field("safe_to_send") === "true",
    recommended_next: field("recommended_next"),
    failure: {
      type: field("failure_type") || failure.type || "",
      subject: field("failure_subject") || failure.subject || "",
      likely_next: field("failure_likely_next") || failure.likely_next || ""
    },
    evidence: field("evidence") ? [field("evidence")] : [],
    raw_fastmcp_output: output
  };
}

async function callHttpApi({ apiUrl, apiToken, large, payload, source, contextBudget }) {
  const base = apiUrl.replace(/\/+$/u, "");
  const endpoint = `${base}${large ? "/triage-large" : "/triage"}`;

  const headers = {
    "content-type": "application/json"
  };

  if (apiToken) {
    headers.authorization = `Bearer ${apiToken}`;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      payload,
      source,
      contextBudget
    })
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json?.ok) {
    const code = json?.error?.code ?? `http_${response.status}`;
    const message = json?.error?.message ?? "FailLens API request failed";
    throw new Error(`${code}: ${message}`);
  }

  return json.result;
}

function callXpayMcp({ xpayUrl, large, payload, source, contextBudget, maxXpayBytes }) {
  const payloadBytes = Buffer.byteLength(payload, "utf8");

  if (payloadBytes > maxXpayBytes) {
    throw new Error(
      `payload_too_large_for_xpay_action_mvp: ${payloadBytes} bytes exceeds max_xpay_bytes=${maxXpayBytes}. Use direct API mode or a smaller captured log.`
    );
  }

  const tool = large ? "triage_large_terminal_crash" : "triage_terminal_crash";
  const payloadBase64 = Buffer.from(payload, "utf8").toString("base64");

  const args = [
    "-y",
    "fastmcp",
    "call",
    tool,
    "--url",
    xpayUrl,
    `payloadBase64=${payloadBase64}`,
    `source=${source}`,
    `contextBudget=${contextBudget}`
  ];

  const result = spawnSync("npx", args, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 20
  });

  const combined = `${result.stdout ?? ""}${result.stderr ? `\n${result.stderr}` : ""}`.trim();

  if (result.status !== 0) {
    throw new Error(`xpay_mcp_call_failed: ${combined.slice(0, 2000)}`);
  }

  const parsed = parseFastMcpText(combined);

  if (
    !parsed.decision &&
    !parsed.risk &&
    !parsed.failure?.type &&
    !parsed.failure?.subject &&
    (!Array.isArray(parsed.evidence) || parsed.evidence.length === 0)
  ) {
    throw new Error(
      `xpay_mcp_no_tool_output: fastmcp exited successfully but returned no parseable FailLens result. Output: ${combined.slice(0, 2000)}`
    );
  }

  return parsed;
}

function safeString(value) {
  return String(value ?? "").trim();
}

function summarizeResult(result, mode) {
  const decision = safeString(result.decision);
  const risk = safeString(result.risk);
  const safeToSend = Boolean(result.safe_to_send);
  const failureType = safeString(result.failure?.type);
  const failureSubject = safeString(result.failure?.subject);
  const recommendedNext = safeString(result.recommended_next || result.failure?.likely_next);

  const evidenceLines = Array.isArray(result.evidence)
    ? result.evidence.slice(0, 8).map((line) => safeString(line)).filter(Boolean)
    : [];

  let summary = `# FailLens Crash Gate Result\n\n`;
  summary += `- Mode: \`${mode}\`\n`;
  summary += `- Decision: \`${decision || "unknown"}\`\n`;
  summary += `- Risk: \`${risk || "unknown"}\`\n`;
  summary += `- Safe to send: \`${safeToSend}\`\n`;
  summary += `- Failure type: \`${failureType || "unknown"}\`\n`;
  summary += `- Failure subject: \`${failureSubject || "unknown"}\`\n`;
  summary += `- Recommended next: \`${recommendedNext || "manual_review"}\`\n`;

  if (!safeToSend) {
    summary += `\n## Safety note\n\nFailLens did not mark this result as safe to send automatically. Review manually before forwarding evidence to an agent or LLM.\n`;
    return summary;
  }

  if (evidenceLines.length > 0) {
    summary += `\n## Useful evidence\n\n`;
    for (const line of evidenceLines) {
      summary += `- ${line.replaceAll("\n", " ")}\n`;
    }
  }

  return summary;
}

async function main() {
  const command = input("command");
  const providedLogFile = input("log_file");
  const xpayMcpUrl = input("xpay_mcp_url");
  const apiUrl = input("faillens_api_url");
  const apiToken = input("faillens_api_token");
  const large = boolInput("large", false);
  const quiet = boolInput("quiet", true);
  const failOnCommandFailure = boolInput("fail_on_command_failure", true);
  const source = input("source", "github_actions") || "github_actions";
  const contextBudget = intInput("context_budget", large ? 4000 : 1200);
  const maxXpayBytes = intInput("max_xpay_bytes", 180000);

  mask(xpayMcpUrl);
  mask(apiToken);

  const tempDir = process.env.RUNNER_TEMP || process.cwd();
  const logPath = providedLogFile
    ? resolve(providedLogFile)
    : resolve(tempDir, "faillens-command.log");
  const triagePath = resolve(tempDir, "faillens-triage.json");

  writeOutput("log_path", logPath);
  writeOutput("triage_json_path", triagePath);

  if (!command && !providedLogFile) {
    throw new Error("Provide either command or log_file.");
  }

  if (command && providedLogFile) {
    throw new Error("Provide only one of command or log_file, not both.");
  }

  let exitCode = 0;

  if (command) {
    exitCode = shellCommand(command, logPath, quiet);
  } else if (!existsSync(logPath)) {
    throw new Error(`log_file not found: ${logPath}`);
  }

  writeOutput("exit_code", String(exitCode));

  if (command && exitCode === 0) {
    const passResult = {
      decision: "none",
      risk: "clean",
      safe_to_send: true,
      recommended_next: "no_triage_needed",
      failure: {
        type: "",
        subject: "",
        likely_next: ""
      },
      evidence: []
    };

    mkdirSync(dirname(triagePath), { recursive: true });
    writeFileSync(triagePath, JSON.stringify(passResult, null, 2) + "\n", "utf8");

    writeOutput("decision", "none");
    writeOutput("risk", "clean");
    writeOutput("safe_to_send", "true");
    writeOutput("failure_type", "");
    writeOutput("failure_subject", "");
    writeOutput("recommended_next", "no_triage_needed");

    appendSummary("# FailLens Crash Gate Result\n\nCommand passed. No crash triage was needed.");

    return;
  }

  const payload = readFileSync(logPath, "utf8");

  let result;
  let mode;

  if (apiUrl) {
    mode = "direct_http";
    result = await callHttpApi({
      apiUrl,
      apiToken,
      large,
      payload,
      source,
      contextBudget
    });
  } else if (xpayMcpUrl) {
    mode = "xpay_mcp";
    result = callXpayMcp({
      xpayUrl: xpayMcpUrl,
      large,
      payload,
      source,
      contextBudget,
      maxXpayBytes
    });
  } else {
    throw new Error("Provide xpay_mcp_url or faillens_api_url.");
  }

  mkdirSync(dirname(triagePath), { recursive: true });
  writeFileSync(triagePath, JSON.stringify(result, null, 2) + "\n", "utf8");

  const decision = safeString(result.decision);
  const risk = safeString(result.risk);
  const safeToSend = Boolean(result.safe_to_send);
  const failureType = safeString(result.failure?.type);
  const failureSubject = safeString(result.failure?.subject);
  const recommendedNext = safeString(result.recommended_next || result.failure?.likely_next);

  writeOutput("decision", decision);
  writeOutput("risk", risk);
  writeOutput("safe_to_send", String(safeToSend));
  writeOutput("failure_type", failureType);
  writeOutput("failure_subject", failureSubject);
  writeOutput("recommended_next", recommendedNext);

  appendSummary(summarizeResult(result, mode));

  if (command && exitCode !== 0 && failOnCommandFailure) {
    process.exit(exitCode);
  }
}

main().catch((error) => {
  writeOutput("decision", "error");
  writeOutput("risk", "unknown");
  writeOutput("safe_to_send", "false");
  writeOutput("failure_type", "");
  writeOutput("failure_subject", "");
  writeOutput("recommended_next", "manual_review");

  appendSummary(`# FailLens Crash Gate Error\n\n\`${String(error.message || error)}\``);

  console.error(`FailLens Action error: ${String(error.message || error)}`);
  process.exit(1);
});
