# Security Scan Report

**Date:** 2026-11-25 11:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe character whitelist
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HMAC-SHA256 signed HttpOnly cookies
3. Webhook Signatures: PASS — HMAC-SHA256 verification with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid regex validated; create-order caps items/quantities/lengths; enquiry uses zod schema
5. Security Headers: PASS — HSTS (preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — custom loader used, no remotePatterns or hostname wildcards
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded credentials found in app/lib/components
8. No localStorage Credentials: PASS — only stores euforyc_uid (random analytics UUID), no tokens or passwords
9. No Error Leaks: PASS — all API routes return generic messages; Momence error.details gated behind NODE_ENV=development
10. Safe Health Checks: PASS — no health/status endpoints exist; no internal config exposed

## Fixes Applied
- None needed

## Manual Action Required
- None
