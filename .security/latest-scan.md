# Security Scan Report

**Date:** 2026-10-03 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7 (down from 8; 1 fixed)
- Medium: 0
- Low: 0

### Remaining High Vulnerabilities (all build-time, not runtime-exploitable)
All 7 trace to `braces@3.0.3` (ReDoS via deeply nested glob patterns), a transitive dependency of `tailwindcss@3.4.19` (via chokidar/micromatch) and `eslint-config-next@16.2.12` (via @next/eslint-plugin-next/fast-glob). Fix requires tailwindcss v4 (breaking major upgrade). These are build-time-only dependencies — glob patterns are hardcoded in config, not user-supplied, so not exploitable in production.

### Fixed
- `eslint-import-resolver-typescript` updated to resolve its vulnerable `fast-glob` dependency (commit de53a25)

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HttpOnly session cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified, fails closed (500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with regex, items capped, lengths sanitized
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — only specific trusted domains, no wildcard hostname
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords in app/lib/components
8. No localStorage Credentials: PASS — only stores anonymous euforyc_uid (UUID), no passwords or tokens
9. No Error Leaks: PASS — all API routes return generic messages; Momence routes expose details only in development
10. Safe Health Checks: PASS — no health/status/ping endpoints that could expose tokens or config

## Fixes Applied
- de53a25: fix(security): update eslint-import-resolver-typescript to fix high-severity fast-glob vuln

## Manual Action Required
- Upgrade tailwindcss from v3 to v4 to resolve remaining 7 braces/micromatch/chokidar vulnerabilities (breaking change — requires config migration). These are build-time dependencies only and not exploitable in production.
- Pre-existing build failure: MOMENCE_API_TOKEN env var is not configured, causing `npm run build` to fail on Momence API routes. This is a deployment configuration issue, not a security vulnerability.
