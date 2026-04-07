# Security Scan Report

**Date:** 2026-04-07 00:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — Both `/api/sips/orders` and `/api/sips/update-order` call `authenticateBarista()` with HttpOnly cookie validation
3. Webhook Signatures: PASS — Square webhook verifies HMAC-SHA256 signature; Momence webhook fails closed when `MOMENCE_WEBHOOK_SECRET` is missing, uses `crypto.timingSafeEqual`
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`, input lengths capped, quantities bounded 1-99
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — No wildcard `hostname: '**'`, only specific trusted domains listed
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or hardcoded passwords found in source
8. No localStorage Credentials: PASS — No localStorage usage for credentials; auth uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — All `error.message` usages guarded by `NODE_ENV === 'development'`; production returns generic messages only
10. Safe Health Checks: PASS — All health endpoints return only `{ status: 'ok' }` with no tokens or config exposed

## Fixes Applied
- None needed

## Manual Action Required
- None
