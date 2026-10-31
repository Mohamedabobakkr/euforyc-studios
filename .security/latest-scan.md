# Security Scan Report

**Date:** 2026-10-31 12:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 13, all fixed)
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — custom image loader with no remote patterns; no hostname wildcards
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous analytics UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only; dev-only `error.details` gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- `d4f05ec` fix(security): upgrade minimatch override to ^11.0.1 to resolve CVE — resolved all 13 moderate minimatch vulnerabilities (GHSA-g3hv-75wg-m249) by bumping the npm override from ^10.2.6 to ^11.0.1

## Manual Action Required
- None
