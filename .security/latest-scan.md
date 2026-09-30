# Security Scan Report

**Date:** 2026-09-30 06:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1, fixed)
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `../`, `//`, `\\`; enforces `/` prefix and safe-character regex
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr+preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns restricted to specific trusted domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost)
7. No Hardcoded Secrets: PASS — grep for sk-, pk_live, hardcoded passwords found nothing; all secrets via env vars
8. No localStorage Credentials: PASS — no tokens or passwords in localStorage
9. No Error Leaks: PASS — all API routes return generic error messages; no stack traces or error details exposed
10. Safe Health Checks: PASS — no health check endpoints that expose tokens or internal config

## Fixes Applied
- `16f6526` fix(security): upgrade brace-expansion 5.0.9 → 5.0.12 (3 DoS CVEs via eslint → minimatch → brace-expansion)

## Manual Action Required
- None
