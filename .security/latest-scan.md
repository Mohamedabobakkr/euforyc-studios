# Security Scan Report

**Date:** 2026-04-05 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\`; regex allows only safe chars
2. API Auth: PASS — /api/sips/orders and /api/sips/update-order both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time compare; Momence webhook uses crypto.timingSafeEqual; both fail closed when keys missing
4. Input Validation: PASS — orderId and fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — no wildcard `**`; restricted to squarecdn.com, euforyc.co.uk, momence.com, S3, localhost
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no credential storage in localStorage
9. No Error Leaks: PASS — MomenceApiError.message now gated behind NODE_ENV=development in all 4 Momence routes; Square/Sips routes return static error strings
10. Safe Health Checks: PASS — track-purchase and track-event GET return only `{ status: 'ok' }`; Momence webhook GET returns only `{ status: 'ok' }`

## Fixes Applied
- `1b73cc7` — fix(security): prevent error message leaks in Momence API routes
  - Gated `error.message` behind `NODE_ENV === 'development'` in events, teachers, products, memberships routes
  - Production responses now return generic "Service temporarily unavailable" instead of upstream API error details
  - Prevents information disclosure of Momence API internals to end users

## Manual Action Required
- None
