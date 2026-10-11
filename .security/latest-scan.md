# Security Scan Report

**Date:** 2026-10-11 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7 (down from 9 — fixed sharp and source-map-js)
- Moderate: 0 (down from 2 — fixed postcss-selector-parser)
- Low: 0

### Remaining High Vulnerabilities (all build-time only)
All 7 vulnerabilities trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested glob patterns). The dependency chain is:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.2.12` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`

**Risk assessment:** LOW — braces is only invoked during `npm run build` / `npx tailwindcss` with developer-controlled glob patterns, never with user input at runtime. eslint runs only during development linting. No fix exists within braces 3.x; tailwindcss v4 drops the dependency but is a major breaking change.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — no credentials stored client-side; only `euforyc_uid` (anonymous analytics UUID)
9. No Error Leaks: PASS — API routes return generic messages; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- `700e8b6` fix(security): override sharp, source-map-js, postcss-selector-parser to patched versions
  - sharp ^0.35.4 → ^0.35.5 (HIGH severity)
  - source-map-js override to ^1.2.2 (HIGH severity)
  - postcss-selector-parser override to ^7.1.6 (MODERATE severity via postcss-nested)

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 7 remaining high vulnerabilities. Major version upgrade with breaking config/class changes. Runtime risk is LOW since these are build-time-only dependencies.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`, common in Next.js apps. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
