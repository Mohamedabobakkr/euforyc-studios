# Security Scan Report

**Date:** 2026-09-02 06:15 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

(1 moderate vulnerability found and fixed during this scan — @humanfs/node < 0.16.8)

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\`; requires leading `/`; enforces strict regex `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — Both `orders/route.ts` and `update-order/route.ts` call `authenticateBarista()` which validates HMAC-SHA256 signed HttpOnly session cookies; constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing; rejects invalid with 403
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; create-order caps items at 50, strings at 100/500 chars, quantity 1-99
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Permissions-Policy, `poweredByHeader: false`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns`; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found in source; all secrets from `process.env`
8. No localStorage Credentials: PASS — Auth uses HttpOnly cookies exclusively; only `euforyc_uid` (anonymous tracking ID) in localStorage
9. No Error Leaks: PASS — All API routes return generic error strings to clients; Momence routes guard `error.details` behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — No health check endpoints exist; no tokens or config exposed

## Fixes Applied
- `ad12931` — fix(security): update @humanfs/node to 0.16.8 (GHSA-p498-v437-472g) — symlink traversal in recursive copy (transitive dep via eslint)

## Manual Action Required
- None
