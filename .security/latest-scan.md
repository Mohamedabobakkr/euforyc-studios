# Security Scan Report

**Date:** 2026-10-04 14:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7
- Medium: 0
- Low: 0

### Remaining High Vulnerabilities (all build-time only)
All 7 vulnerabilities trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested glob patterns). The dependency chain is:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.2.12` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`

**Risk assessment:** LOW — these are build-time dependencies only. The `braces` vulnerability requires processing specially crafted glob patterns, which only occurs during `npm run build` / `npx tailwindcss` — never at runtime on the production server. No fix exists within braces 3.x; tailwindcss v4 drops the dependency but is a major breaking change.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict regex
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost)
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in source
8. No localStorage Credentials: PASS — only stores `euforyc_uid` (anonymous analytics UUID), no credentials
9. No Error Leaks: PASS — API routes return generic error messages; no stack traces or `String(error)` in responses
10. Safe Health Checks: PASS — no health endpoints expose tokens or internal config

## Fixes Applied
- `c3c443c` — fix(security): add rate limiting to /api/enquiry endpoint (5 submissions / 15 min per IP)

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 7 remaining `braces` vulnerabilities. This is a major version upgrade with breaking changes to configuration format (tailwind.config.js → CSS-based config). Recommend scheduling this as a planned migration sprint. Runtime risk is LOW in the meantime since these are build-time-only dependencies.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`, common in Next.js apps. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
