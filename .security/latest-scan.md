# Security Scan Report

**Date:** 2026-07-22 15:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

577 packages audited. 0 vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — orders and update-order routes validate HttpOnly HMAC-signed session cookie via authenticateBarista()
3. Webhook Signatures: PASS — fails closed when SQUARE_WEBHOOK_SIGNATURE_KEY missing (returns 500), uses constant-time HMAC-SHA256 verification
4. Input Validation: PASS — orderId/fulfillmentUid validated with `^[a-zA-Z0-9_-]+$`, state transitions whitelisted, item quantities capped
5. Security Headers: PASS — HSTS (2yr+preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns restricted to squarecdn.com, S3, euforyc.co.uk, momence.com, localhost only
7. No Hardcoded Secrets: PASS — all secrets sourced from process.env, no sk-/pk_live/plaintext passwords in source
8. No localStorage Credentials: PASS — auth uses HttpOnly+Secure+SameSite cookies, no credential storage in localStorage
9. No Error Leaks: PASS — all API routes return generic error messages; error.details only exposed in NODE_ENV=development
10. Safe Health Checks: PASS — no health check endpoints exist that could leak config/tokens

## Fixes Applied
- None needed

## Manual Action Required
- None
