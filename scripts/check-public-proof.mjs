import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const rootReadme = "README.md";

const proofFiles = [
  "docs/public-proof/README.md",
  "docs/public-proof/omniroute-3578.md",
  "docs/public-proof/omniroute-5006.md",
  "docs/public-proof/omniroute-4091.md"
];

const requiredFiles = [rootReadme, ...proofFiles];

for (const file of requiredFiles) {
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

function walk(dir) {
  if (!existsSync(dir)) return [];

  const out = [];

  for (const item of readdirSync(dir)) {
    const path = join(dir, item);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      out.push(...walk(path));
    } else {
      out.push(path.replaceAll("\\", "/"));
    }
  }

  return out;
}

const scannedFiles = [
  rootReadme,
  "action.yml",
  ...walk("docs"),
  ...walk("examples"),
  ...walk("snippets"),
  ...walk("scripts"),
  ...walk(".github")
].filter((file, index, arr) => {
  if (!/\.(md|json|yml|yaml|toml|txt)$/i.test(file)) return false;
  return arr.indexOf(file) === index;
});

const actualSecretPattern = /xpay_sk_(?:test|live)?_[A-Za-z0-9_-]{12,}|xpay_sk_[A-Za-z0-9_-]{12,}/i;

const forbiddenPatterns = [
  actualSecretPattern,
  /\b(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis):\/\/[^\s"'`<>]+/i,
  /\b(?:DATABASE_URL|POSTGRES_URL|POSTGRESQL_URL|MYSQL_URL|MONGODB_URI|REDIS_URL)=\s*(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis):\/\//i,
  /\bsupersecret\b/i,
  /\bghp_[A-Za-z0-9_]{12,}/i,
  /\bgithub_pat_[A-Za-z0-9_]{12,}/i,
  /\bAKIA[0-9A-Z]{16}\b/i,
  /Authorization:\s*Bearer\s+(?!\[REDACTED_TOKEN\])[\w.-]{8,}/i,
  /\bBearer\s+(?!\[REDACTED_TOKEN\])[\w.-]{16,}/i,
  /\b(?:PASSWORD|TOKEN|SECRET|API_KEY|ACCESS_KEY)=\s*(?!\[REDACTED_)[^\s"'`]{4,}/i,
  /\/Users\/[^<\s"'`)]+/i,
  /\/home\/runner\/work/i,
  /file:\/\/\/home\/runner/i,
  /[A-Za-z]:\\Users\\/i
];

for (const file of scannedFiles) {
  const text = readFileSync(file, "utf8");

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(text)) {
      throw new Error(`Forbidden public content matched in ${file}: ${pattern}`);
    }
  }
}

console.log(`public_proof_check{ok files:${scannedFiles.length}}`);
