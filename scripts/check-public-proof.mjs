import { readFileSync, existsSync } from "node:fs";

const rootReadme = "README.md";

const proofFiles = [
  "docs/public-proof/README.md",
  "docs/public-proof/omniroute-3578.md",
  "docs/public-proof/omniroute-5006.md",
  "docs/public-proof/omniroute-4091.md"
];

const allRequiredFiles = [rootReadme, ...proofFiles];

for (const file of allRequiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const rootText = readFileSync(rootReadme, "utf8");

if (!rootText.includes("docs/public-proof/README.md")) {
  throw new Error("Root README does not link to the public proof library.");
}

const combinedProof = proofFiles
  .map((file) => readFileSync(file, "utf8"))
  .join("\n\n");

const requiredProofPhrases = [
  "FailLens Public Proof Library",
  "This is not an OmniRoute endorsement",
  "already-public",
  "missing_dependency",
  "bundled_build_path_error",
  "mcp_tool_dispatch_failure",
  "search_workflows",
  "createRequire(import.meta.url) build-machine path"
];

for (const phrase of requiredProofPhrases) {
  if (!combinedProof.includes(phrase)) {
    throw new Error(`Missing required proof phrase: ${phrase}`);
  }
}

const forbiddenProofPatterns = [
  /xpay_sk_/i,
  /\?key=/i,
  /XPAY_MCP_URL/i,
  /Authorization:\s*Bearer/i,
  /sk_live/i,
  /api_key/i,
  /\/Users\//i,
  /\/opt\/homebrew/i,
  /rucciva/i,
  /home\/runner\/work/i,
  /file:\/\/\/home\/runner/i
];

for (const pattern of forbiddenProofPatterns) {
  if (pattern.test(combinedProof)) {
    throw new Error(`Forbidden public-proof content matched: ${pattern}`);
  }
}

// Root README may contain xpay setup examples, but it must not contain an actual-looking secret key.
const actualSecretPattern = /xpay_sk_(?:test|live)_[A-Za-z0-9_-]{12,}/i;

if (actualSecretPattern.test(rootText)) {
  throw new Error("Root README appears to contain an actual xpay secret key.");
}

console.log("public_proof_check{ok}");
