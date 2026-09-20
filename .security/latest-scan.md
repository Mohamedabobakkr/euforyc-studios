# Security Scan Report

**Date:** 2026-09-20 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, and enforces safe character allowlist
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() via HttpOnly session cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; returns 500 when key is missing (fail-closed)
4. Input Validation: PASS — orderId and fulfillmentUid validated against /^[a-zA-Z0-9_-]+$/; quantities capped; input lengths sliced
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns restricted to specific trusted domains (squarecdn, S3, euforyc.co.uk, momence, localhost)
7. No Hardcoded Secrets: PASS — all secrets sourced from environment variables; no sk-, pk_live, or credentials in source
8. No localStorage Credentials: PASS — localStorage stores only anonymous UID (euforyc_uid), no tokens or passwords
9. No Error Leaks: PASS — all API error responses return generic messages; no stack traces or error.message exposed
10. Safe Health Checks: PASS — no health check endpoints exist; no internal config exposure

## Fixes Applied
- None needed

## Manual Action Required
- None
