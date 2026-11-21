# Security Scan Report

**Date:** 2026-11-21 03:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces `/[a-zA-Z0-9/_-]+` pattern
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` via HttpOnly cookie
3. Webhook Signatures: PASS — fails closed (500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing; HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; create-order sanitizes lengths and caps quantities
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — uses custom image loader, no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — only `euforyc_uid` (random analytics UUID) stored; no passwords, tokens or credentials
9. No Error Leaks: PASS — all API routes return generic error messages; internal details logged server-side only
10. Safe Health Checks: PASS — no health check endpoints expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
