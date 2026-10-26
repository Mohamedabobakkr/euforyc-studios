# Security Scan Report

**Date:** 2026-10-26 03:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

Note: zod was upgraded from v3.23.8 to v4.6.7 in a prior scan (2026-10-25)
to fix GHSA-mrhx-c7xc-m3w5 (memory exhaustion, CVSS 7.5). The fix remains
in place and npm audit returns 0 vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous tracking UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed (zod v4.6.7 fix from prior scan commit b0932c9 remains effective)

## Manual Action Required
- None
