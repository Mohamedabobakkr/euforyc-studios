# Security Scan Report

**Date:** 2026-10-19 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7 (all build-time only, no safe auto-fix path)
- Medium: 0
- Low: 0

### Details
All 7 HIGH findings trace to build-time dependencies (CSS compilation and linting), not runtime code:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3` (stack-exhaustion DoS via nested patterns)
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.4.1` → `@next/eslint-plugin-next@16.4.1` → `fast-glob@3.3.1` → `micromatch` → `braces`

**Risk assessment:** LOW — these packages process CSS and lint rules at build time only. They never execute in the production Node.js runtime or browser. Exploitation requires a malicious Tailwind config or glob pattern in the developer environment, not via web traffic. No patched minor/patch versions exist for any of these chains.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order enforces length limits and item caps
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous tracking UID
9. No Error Leaks: PASS — API routes return generic messages; `error.details` only exposed when `NODE_ENV === 'development'`; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed — all 10 code security checks pass; npm vulnerabilities are build-time only with no safe auto-fix path

## Manual Action Required
- **tailwindcss v3→v4 migration**: Would resolve 5 of 7 vulnerabilities (braces, micromatch, chokidar, tailwindcss, fast-glob partial). Significant migration with breaking changes — recommend scheduling dedicated sprint when convenient.
- **eslint-config-next / @next/eslint-plugin-next**: Latest v16.4.1 still depends on fast-glob@3.3.1. Monitor for a patch release that drops the vulnerable micromatch dependency.
- **Consider devDependencies**: tailwindcss and eslint-config-next are build-time tools; moving them to devDependencies won't fix audit but correctly categorizes production risk.
