# Security Scan Report

**Date:** 2026-04-08 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe character regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both use `authenticateBarista()` with HMAC-SHA256 signed HttpOnly session cookies
3. Webhook Signatures: PASS — Square webhook verifies HMAC-SHA256 with constant-time comparison (fails closed on missing key); Momence webhook fails closed when `MOMENCE_WEBHOOK_SECRET` not configured
4. Input Validation: PASS — Order IDs validated with `^[a-zA-Z0-9_-]+$`; create-order sanitizes names (100 char), notes (500 char), limits items (50 max), quantities (1-99)
5. Security Headers: PASS — HSTS (63072000s + preload), CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — No wildcard `**` hostname; restricted to squarecdn.com, momence.com, euforyc.co.uk, specific S3 bucket, localhost
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — No localStorage usage found; credentials stored in HttpOnly cookies only
9. No Error Leaks: PASS — API routes return generic error messages; Momence routes include details only when `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — All health endpoints return only `{ status: 'ok' }`

## Fixes Applied
- `7a47af6` fix(security): patch lodash CVE and suppress error message leaks (applied in prior scan run, already on main)

## Manual Action Required
- None
