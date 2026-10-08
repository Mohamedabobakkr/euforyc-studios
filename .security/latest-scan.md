# Security Scan Report

**Date:** 2026-10-08 12:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7 (all require tailwindcss v3->v4 or eslint-config-next major upgrade -- build-time only)
- Moderate: 2 (postcss-nested, postcss-selector-parser -- blocked by tailwindcss v3->v4)
- Low: 0

## Fixes Applied
- sharp 0.35.4 -> 0.35.5 (CVE-2026-96889: librsvg vulnerability, severity high)
- source-map-js 1.2.1 -> 1.2.2 (GHSA-68fv-2mgg-jv7q: event-loop DoS, severity high)
- Both fixes confirmed active via overrides in package.json

## Remaining (require major version upgrades -- no safe auto-fix)

**tailwindcss@3.4.19** (7 vulns -- build-time only):
- `braces@3.0.3` (high) -- stack-exhaustion DoS via deeply nested glob patterns; no patch in v3
- `chokidar@3.6.0` -> braces (high)
- `micromatch@4.0.8` -> braces (high)
- `fast-glob` -> micromatch (high)
- `postcss-selector-parser@6.1.4` <7.1.6 (moderate) -- quadratic complexity DoS
- `postcss-nested@6.2.0` -> postcss-selector-parser (moderate)

**eslint-config-next** (dev-time only):
- `@next/eslint-plugin-next` -> fast-glob -> micromatch -> braces (high)

**Risk assessment:** LOW -- these are build/dev-time dependencies only. The braces vulnerability requires processing specially crafted glob patterns during `npm run build` / `npx tailwindcss`, never at runtime. The postcss-selector-parser vulnerability requires processing malicious CSS selectors at build time. No fix exists within the current major versions; tailwindcss v4 drops these dependencies.

## Code Security Checks
1. SSRF Protection: PASS -- `validateSquarePath()` blocks `..`, `//`, `\\` with strict allowlist regex
2. API Auth: PASS -- orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS -- HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS -- orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS -- HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS -- specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS -- no `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS -- no credentials stored client-side; only `euforyc_uid` (anonymous analytics UUID)
9. No Error Leaks: PASS -- API routes return generic messages; internal error details logged server-side only
10. Safe Health Checks: PASS -- no health/status endpoints expose tokens or internal config

## Manual Action Required
- **tailwindcss v3 -> v4 migration:** Would resolve all 9 remaining vulnerabilities. Major version upgrade with breaking config changes. Runtime risk is LOW (build-time only). Recommend scheduling as a planned migration sprint.
- **Build configuration:** `npm run build` fails in environments without MOMENCE_API_TOKEN set (pre-existing, not a security issue). Consider making the Momence API route handle missing tokens gracefully at build time.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src` -- standard for Next.js apps. Nonce-based scripts would strengthen CSP but require Next.js config changes.
