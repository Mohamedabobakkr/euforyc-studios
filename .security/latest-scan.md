# Security Scan Report

**Date:** 2026-11-04 11:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 13, now resolved)
- Low: 0

568 packages audited, 0 vulnerabilities after fix. Previous minimatch override (^10.2.6) pulled in minimatch <11.0.1 which had a moderate DoS via globparts amplification (GHSA-g3hv-75wg-m249). Override bumped to ^11.0.1.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe-character regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — both `/api/sips/orders` and `/api/sips/update-order` call `authenticateBarista()` (HMAC-SHA256 signed HttpOnly cookie)
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — order IDs validated with `^[a-zA-Z0-9_-]+$`; state transitions whitelisted; create-order sanitises all inputs; redirect URLs checked against allowlist
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set; X-Powered-By disabled
6. Image Hostnames: PASS — custom image loader; no remote patterns or `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, components/
8. No localStorage Credentials: PASS — localStorage stores only anonymous analytics UID (`euforyc_uid`); barista auth uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — all API routes return generic error messages; `details` fields in Momence routes gated by `NODE_ENV === 'development'`; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- `142d94b` fix(security): bump minimatch override ^10.2.6 → ^11.0.1 (GHSA-g3hv-75wg-m249) — resolved all 13 moderate DoS vulnerabilities in ESLint toolchain

## Manual Action Required
- None
