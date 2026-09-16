# Security Scan Report

**Date:** 2026-09-16 19:24 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `../`, `//`, `\\` and enforces safe character allowlist
2. API Auth: PASS — /api/sips/orders and /api/sips/update-order both call authenticateBarista() with HttpOnly cookie validation
3. Webhook Signatures: PASS — webhook route fails closed (returns 500) when SQUARE_WEBHOOK_SIGNATURE_KEY is missing; HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId and fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions constrained to valid set
5. Security Headers: PASS — HSTS (2yr+preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no wildcard `**` hostname; only explicit trusted domains listed in remotePatterns
7. No Hardcoded Secrets: PASS — all secrets sourced from environment variables; no sk-, pk_live, or AKIA patterns found in source
8. No localStorage Credentials: PASS — localStorage stores only `euforyc_uid` (anonymous visitor UUID), no tokens or passwords
9. No Error Leaks: PASS — API routes return generic error messages; error.details only exposed when NODE_ENV=development
10. Safe Health Checks: PASS — no health check endpoints exist; no internal config or tokens exposed

## Fixes Applied
- None needed

## Manual Action Required
- None
