# Security Scan Report

**Date:** 2026-09-25 03:23 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `../`, `//`, `\\`; enforces `/` prefix and safe-character regex
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order sanitizes lengths and caps quantities
5. Security Headers: PASS — HSTS (2yr+preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns restricted to specific trusted domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost)
7. No Hardcoded Secrets: PASS — grep for sk-, pk_live, hardcoded passwords found nothing; all secrets via env vars
8. No localStorage Credentials: PASS — localStorage only stores euforyc_uid (anonymous UUID); no tokens or passwords
9. No Error Leaks: PASS — error details only exposed when NODE_ENV=development; production returns generic messages
10. Safe Health Checks: PASS — no health check endpoints found that expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
