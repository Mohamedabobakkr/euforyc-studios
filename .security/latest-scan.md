# Security Scan Report

**Date:** 2026-09-14 11:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — Both orders and update-order routes call authenticateBarista() with HMAC-SHA256-signed HttpOnly session cookie
3. Webhook Signatures: PASS — Fails closed with 500 when SQUARE_WEBHOOK_SIGNATURE_KEY is missing; constant-time HMAC-SHA256 comparison
4. Input Validation: PASS — orderId and fulfillmentUid validated against `/^[a-zA-Z0-9_-]+$/`; state transitions validated against allowlist
5. Security Headers: PASS — HSTS (2-year, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; poweredByHeader disabled
6. Image Hostnames: PASS — remotePatterns uses specific hostnames (squarecdn.com, S3 bucket, euforyc.co.uk, momence.com, localhost); no `**` wildcard
7. No Hardcoded Secrets: PASS — all secrets sourced from process.env
8. No localStorage Credentials: PASS — barista session uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — API routes return generic error messages; no stack traces or internal details exposed
10. Safe Health Checks: PASS — no dedicated health endpoint exists; no risk of token/config exposure

## Fixes Applied
- None needed — 0 npm vulnerabilities; all code security checks pass

## Manual Action Required
- None
