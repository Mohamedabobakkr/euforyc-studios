# Security Scan Report

**Date:** 2026-10-09 11:27 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 7 (all braces/micromatch via tailwindcss v3 — build-time only, requires semver-major upgrade to v4)
- Moderate: 2 (postcss-selector-parser, postcss-nested — also via tailwindcss v3)
- Low: 0

### Remaining Vulnerabilities (all build-time only)
All 9 remaining vulnerabilities trace to `tailwindcss@3.4.19` and `eslint-config-next@16.4.0` dependency trees:
- `braces@3.0.3` (7 high) — GHSA-vfj7-8cjw-p6xm: stack-exhaustion DoS via deeply nested glob patterns
- `postcss-selector-parser@6.1.4` (1 moderate) — GHSA-rj75-hqrm-r3gf: quadratic complexity in flat selector parsing
- `postcss-nested@6.2.0` (1 moderate) — transitive via postcss-selector-parser

**Risk assessment:** LOW — these are build-time dependencies only. The `braces` vulnerability requires processing specially crafted glob patterns during `npm run build` / `npx tailwindcss`, never at runtime serving user requests. Tailwindcss 3.4.19 is the latest v3 patch. Fixing requires tailwindcss v4, a breaking major upgrade.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict allowlist regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets loaded from environment variables
8. No localStorage Credentials: PASS — only random analytics UID (`euforyc_uid`) stored client-side
9. No Error Leaks: PASS — API routes return generic error messages; Momence routes guard `error.details` behind `NODE_ENV === 'development'`; enquiry failures logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- None needed this scan — all code security checks pass; npm vulnerabilities require manual major version migration

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 9 remaining npm vulnerabilities (7 high, 2 moderate). This is a major version upgrade with breaking changes to configuration format (CSS-based config, new utility syntax). Recommend scheduling as a planned migration sprint. Runtime risk is LOW since these are build-time-only dependencies.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`, common in Next.js apps. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
