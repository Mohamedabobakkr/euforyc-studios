# Security Scan Report

**Date:** 2026-04-06 00:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` via HttpOnly cookie
3. Webhook Signatures: PASS — Square webhook verifies HMAC-SHA256, fails closed when key missing; Momence webhook also fails closed with `crypto.timingSafeEqual`
4. Input Validation: PASS — Order IDs validated with `^[a-zA-Z0-9_-]+$`, quantities capped at 99, string lengths sliced
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; only specific trusted domains listed
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or hardcoded passwords found in source
8. No localStorage Credentials: PASS — No tokens/passwords/secrets stored in localStorage
9. No Error Leaks: PASS — All API routes return generic error messages; internal errors logged server-side only; Momence routes only expose details in `development` mode
10. Safe Health Checks: PASS — Health endpoints return only `{ status: 'ok' }`

## Fixes Applied
- None needed

## Manual Action Required
- None
