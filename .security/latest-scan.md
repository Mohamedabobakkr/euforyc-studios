# Security Scan Report

**Date:** 2026-09-12 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, and enforces safe character whitelist
2. API Auth: PASS — both /api/sips/orders and /api/sips/update-order call authenticateBarista() with HttpOnly cookie session validation
3. Webhook Signatures: PASS — SQUARE_WEBHOOK_SIGNATURE_KEY checked at top of handler; returns 500 when missing (fail-closed); HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId and fulfillmentUid validated against `/^[a-zA-Z0-9_-]+$/`; state transitions validated against allowlist
5. Security Headers: PASS — HSTS (2-year, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns uses specific hostnames (squarecdn.com, S3 bucket, euforyc.co.uk, momence.com, localhost); no `**` wildcard
7. No Hardcoded Secrets: PASS — all secrets sourced from process.env (BARISTA_PASSWORD, SQUARE_ACCESS_TOKEN, SQUARE_WEBHOOK_SIGNATURE_KEY)
8. No localStorage Credentials: PASS — no localStorage usage for passwords, tokens, or secrets found
9. No Error Leaks: PASS — error.message only exposed when NODE_ENV === 'development'; production responses use generic messages
10. Safe Health Checks: PASS — no dedicated health endpoint exists; no risk of token/config exposure

## Fixes Applied
- None needed — prior scan already upgraded next (^16.3.4) and sharp (^0.35.4); npm audit reports 0 vulnerabilities

## Manual Action Required
- None
