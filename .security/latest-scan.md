# Security Scan Report

**Date:** 2026-11-03 11:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` blocks `..`, `//`, `\\`, and enforces safe character regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `app/api/sips/orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` before processing; auth uses HMAC-SHA256 signed HttpOnly cookies with constant-time password comparison
3. Webhook Signatures: PASS — `app/api/sips/webhook/route.ts` fails closed when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing (returns 500); HMAC-SHA256 verified with constant-time comparison
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; fulfillment states validated against whitelist; item quantities capped at 99; string lengths truncated
5. Security Headers: PASS — HSTS (2-year, includeSubDomains, preload), CSP (strict policy with frame-ancestors 'self'), X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set in `next.config.js`; X-Powered-By disabled
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; images use custom loader from pre-built static files
7. No Hardcoded Secrets: PASS — No API keys, tokens, or passwords found in `app/`, `lib/`, or `components/` source files; all secrets loaded from environment variables
8. No localStorage Credentials: PASS — `localStorage` used only for anonymous visitor UID (`euforyc_uid`), no credentials or tokens stored client-side
9. No Error Leaks: PASS — All API routes return generic error messages to clients; `error.details` only included when `NODE_ENV === 'development'`; no stack traces or `String(error)` in responses
10. Safe Health Checks: PASS — No health check endpoints exist; no routes expose tokens or internal configuration

## Fixes Applied
- None needed

## Manual Action Required
- None
