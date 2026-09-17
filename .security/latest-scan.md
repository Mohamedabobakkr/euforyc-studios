# Security Scan Report

**Date:** 2026-09-17 11:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, enforces leading `/` and safe character whitelist
2. API Auth: PASS — both orders and update-order routes call authenticateBarista() via HttpOnly cookie before processing
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; rejects with 403 on invalid; fails closed (500) when key missing
4. Input Validation: PASS — orderId and fulfillmentUid validated against `/^[a-zA-Z0-9_-]+$/`; state transitions enforced
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — restricted to specific trusted domains (squarecdn.com, S3 bucket, euforyc.co.uk, momence.com, localhost); no wildcard `**`
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — localStorage only stores anonymous `euforyc_uid` identifier, no tokens or passwords
9. No Error Leaks: PASS — all API catch blocks return generic error messages; no `details: String(error)` or stack trace exposure
10. Safe Health Checks: PASS — no health/status endpoints exist; no risk of config or token exposure

## Fixes Applied
- None needed

## Manual Action Required
- None
