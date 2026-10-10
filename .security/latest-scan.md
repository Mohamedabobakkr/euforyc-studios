# Security Scan Report

**Date:** 2026-10-10 08:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7
- Medium: 2
- Low: 0

### Fixed This Scan
- **sharp <0.35.5** (high): CVE-2026-96889 librsvg vulnerability — lock file updated to 0.35.5
- **source-map-js 1.0.0-1.2.1** (high): event-loop DoS via indexed source-map offsets — lock file updated to 1.2.2

### Remaining (build-time only, no runtime exposure)
All 9 remaining vulnerabilities trace to build-time dependencies:
- **braces <=3.0.3** (high): stack-exhaustion DoS via deeply nested glob patterns — no fix in 3.x; requires tailwindcss v4
- **chokidar, micromatch, fast-glob** (high): transitive via braces — same root cause
- **eslint-config-next / @next/eslint-plugin-next** (high): transitive via fast-glob/micromatch
- **postcss-selector-parser <7.1.6** (moderate): quadratic complexity in flat selector parsing — requires tailwindcss v4
- **postcss-nested** (moderate): transitive via postcss-selector-parser — same root cause

**Risk assessment:** LOW — these are build-time dependencies only. The braces vulnerability requires processing specially crafted glob patterns during `npm run build` / `npx tailwindcss`, never at runtime. postcss-selector-parser is similarly build-time only.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates all inputs with length limits
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — no credentials stored client-side; only `euforyc_uid` (anonymous analytics UUID)
9. No Error Leaks: PASS — API routes return generic messages; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- sharp and source-map-js updated via npm audit fix (package-lock.json)

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 7 remaining high and 2 moderate vulnerabilities. Major version upgrade with breaking changes to configuration format. Runtime risk is LOW since these are build-time-only dependencies.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`, common in Next.js apps. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
