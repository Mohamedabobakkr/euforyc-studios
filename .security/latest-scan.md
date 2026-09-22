# Security Scan Report

**Date:** 2026-09-22 03:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe-character regex
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HttpOnly cookie sessions
3. Webhook Signatures: PASS — fails closed when SQUARE_WEBHOOK_SIGNATURE_KEY missing (500); HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with /^[a-zA-Z0-9_-]+$/; state transitions enforced
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no hostname:'**' wildcard; only specific trusted domains (squarecdn.com, euforyc.co.uk, momence.com, etc.)
7. No Hardcoded Secrets: PASS — no sk-, sk_live, pk_live, or hardcoded passwords found in app/, lib/, components/
8. No localStorage Credentials: PASS — localStorage only stores euforyc_uid (anonymous user ID); no credentials
9. No Error Leaks: PASS — error details gated behind NODE_ENV==='development'; production returns generic messages
10. Safe Health Checks: PASS — no health check endpoints that expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
