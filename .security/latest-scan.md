# Security Scan Report

**Date:** 2026-10-09 14:00 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 7
- Moderate: 2
- Low: 0

All 9 vulnerabilities are in build-time transitive dependencies (unchanged from previous scan):
- `braces@3.0.3` (7 high) — GHSA-vfj7-8cjw-p6xm: stack-exhaustion DoS via deeply nested glob patterns (via tailwindcss@3.x)
- `postcss-selector-parser@6.1.4` (1 moderate) — GHSA-rj75-hqrm-r3gf: quadratic complexity in flat selector parsing (via tailwindcss@3.x)
- `postcss-nested@6.2.0` (1 moderate) — transitive via postcss-selector-parser

**Risk assessment:** LOW — these are build-time dependencies only. The braces vulnerability requires processing specially crafted glob patterns during build, never at runtime. No production user traffic is exposed.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets loaded from environment variables
8. No localStorage Credentials: PASS — only random analytics UID (`euforyc_uid`) stored client-side
9. No Error Leaks: PASS — API routes return generic error messages; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- None — all npm vulnerabilities require semver-major upgrades (breaking changes); all code security checks pass

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 9 remaining npm vulnerabilities. This is a major version upgrade with breaking config format changes. Recommend scheduling as a planned migration sprint. Runtime risk is LOW since these are build-time-only dependencies.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
