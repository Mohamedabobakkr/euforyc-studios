# Security Scan Report

**Date:** 2026-04-09 03:35 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks ../, //, \\ and enforces safe-character regex /^\/[a-zA-Z0-9/_-]+$/
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() via HttpOnly HMAC-signed session cookie
3. Webhook Signatures: PASS — Square webhook verifies HMAC-SHA256 (fail-closed on missing key); Momence webhook uses crypto.timingSafeEqual (fail-closed)
4. Input Validation: PASS — orderId/fulfillmentUid validated with /^[a-zA-Z0-9_-]+$/; create-order caps items (50), quantity (1-99), and string lengths
5. Security Headers: PASS — HSTS (63072000s, includeSubDomains, preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Permissions-Policy, Referrer-Policy, poweredByHeader: false
6. Image Hostnames: PASS — remotePatterns restricted to squarecdn.com, s3 bucket, euforyc.co.uk, momence.com, localhost; no wildcard **
7. No Hardcoded Secrets: PASS — grep for sk-, pk_live, sk_live, sk_test, hardcoded passwords returned 0 matches; all secrets via process.env
8. No localStorage Credentials: PASS — grep for localStorage returned 0 matches across all .ts/.tsx files
9. No Error Leaks: PASS — all API catch blocks return generic messages; error.details only exposed in NODE_ENV=development; no String(error) or stack traces in responses
10. Safe Health Checks: PASS — GET handlers on webhooks/momence, track-purchase, track-event return only { status: 'ok' }

## Fixes Applied
- None needed

## Manual Action Required
- None
