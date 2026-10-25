# Security Scan Report

**Date:** 2026-10-25 13:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces safe character whitelist
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` (HttpOnly cookie)
3. Webhook Signatures: PASS — HMAC-SHA256 verified; returns 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing (fail-closed)
4. Input Validation: PASS — Order IDs validated with `safeIdPattern`, state transitions whitelisted, input lengths capped
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
6. Image Hostnames: PASS — Only specific trusted domains (squarecdn.com, euforyc.co.uk, momence.com, localhost)
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or inline credentials found in app/lib/components
8. No localStorage Credentials: PASS — No sensitive data stored in localStorage
9. No Error Leaks: PASS — All API routes return generic error messages; internal details only in server logs; Momence error details gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — No dedicated health endpoints; auth status check returns only `{ authenticated: boolean }`

## Fixes Applied
- None needed

## Manual Action Required
- None
