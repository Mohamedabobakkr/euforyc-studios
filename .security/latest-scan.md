# Security Scan Report

**Date:** 2026-04-09 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

(542 production dependencies, 578 total — all clean)

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in lib/square.ts blocks `../`, `//`, `\\` and enforces strict alphanumeric regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — Both orders/route.ts and update-order/route.ts call `authenticateBarista()` (HttpOnly cookie + HMAC-SHA256 signed session token)
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed with 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; state transitions checked against whitelist; inputs length-capped
5. Security Headers: PASS — HSTS (2yr+preload), X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, full CSP, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard `hostname: '**'`
7. No Hardcoded Secrets: PASS — All tokens/keys use environment variables; no `sk-`, `pk_live`, or plaintext passwords in source
8. No localStorage Credentials: PASS — Auth uses HttpOnly+Secure+SameSite cookies exclusively; no localStorage usage found
9. No Error Leaks: PASS — All API routes return generic error messages; no `details: String(error)` or stack traces exposed
10. Safe Health Checks: PASS — No health check endpoints exist (no internal config exposure risk)

## Fixes Applied
- None needed

## Manual Action Required
- None
