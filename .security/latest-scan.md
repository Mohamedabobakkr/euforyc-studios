# Security Scan Report

**Date:** 2026-10-10 06:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7
- Medium: 2
- Low: 0

### Fixed this scan
- **sharp** (<0.35.5 → 0.35.5): librsvg use-after-free CVE-2026-96889
- **source-map-js** (1.2.1 → 1.2.2): event-loop DoS via indexed source-map offsets (GHSA-68fv-2mgg-jv7q)

### Remaining (build-time dependencies, require major version migration)
All 9 remaining vulnerabilities trace to build-time dependencies:
- **braces** (<=3.0.3): stack-exhaustion DoS via deeply nested patterns — transitive dep of tailwindcss v3 via chokidar/micromatch. Fix requires tailwindcss v4 migration (breaking).
- **postcss-selector-parser** (<7.1.6): quadratic complexity CPU exhaustion — transitive dep of tailwindcss v3 via postcss-nested. Fix requires tailwindcss v4 migration (breaking).
- **eslint-config-next / @next/eslint-plugin-next**: depends on fast-glob → micromatch → braces. Fix requires eslint-config-next downgrade to 14.x (breaking).

**Risk assessment:** LOW — these are build-time dependencies only, never loaded in the production runtime.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — no credentials stored client-side; only `euforyc_uid` (anonymous analytics UUID)
9. No Error Leaks: PASS — API routes return generic messages; error details only exposed when `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- sharp and source-map-js updated via npm audit fix (package-lock.json already upstream from prior scan session)

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve 7 high + 2 moderate vulnerabilities in braces, chokidar, micromatch, fast-glob, postcss-selector-parser, postcss-nested. These are build-time dependencies and do not affect the production runtime, but should be planned as a dedicated migration effort.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
