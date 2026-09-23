# Security Scan Report

**Date:** 2026-09-23 09:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`; regex-validates path characters
2. API Auth: PASS — orders and update-order routes authenticate via HttpOnly HMAC-SHA256 session cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated against `/^[a-zA-Z0-9_-]+$/`; state transitions validated
5. Security Headers: PASS — HSTS (preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
6. Image Hostnames: PASS — no wildcard `**` hostname; all domains explicitly listed
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords in source
8. No localStorage Credentials: PASS — only stores euforyc_uid (random analytics ID)
9. No Error Leaks: PASS — API routes return generic messages; no stack traces or error details exposed
10. Safe Health Checks: PASS — no health check endpoints exist (N/A)

## Fixes Applied
- None needed

## Manual Action Required
- None
