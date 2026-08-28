# Security Scan Report

**Date:** 2026-08-28 09:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces safe-character regex
2. API Auth: PASS — Both `orders/route.ts` and `update-order/route.ts` call `authenticateBarista()` and reject with 401
3. Webhook Signatures: PASS — Fails closed when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing (returns 500); HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions checked
5. Security Headers: PASS — HSTS (preload), X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns`; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `sk_live`, `pk_live`, or hardcoded passwords in `app/`, `lib/`, `components/`
8. No localStorage Credentials: PASS — No sensitive values stored in localStorage
9. No Error Leaks: PASS — All API routes return generic error messages; `error.details` gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — No health endpoints expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
