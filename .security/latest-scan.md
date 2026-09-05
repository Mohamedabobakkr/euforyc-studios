# Security Scan Report

**Date:** 2026-09-05 08:12 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Moderate: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\`; requires leading `/`; enforces strict regex `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — Both `orders/route.ts` and `update-order/route.ts` call `authenticateBarista()` which validates HMAC-SHA256 signed HttpOnly session cookies; constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing; rejects invalid with 403
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted via VALID_TRANSITIONS map
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Permissions-Policy, `poweredByHeader: false`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns`; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found in source; all secrets from `process.env`
8. No localStorage Credentials: PASS — Auth uses HttpOnly cookies exclusively; no credentials in localStorage
9. No Error Leaks: PASS — All API routes return generic error strings to clients; no `details: String(error)` or stack traces in responses
10. Safe Health Checks: PASS — No health check endpoints exist; no tokens or config exposed

## Fixes Applied
- Previously applied by earlier scan run (`67103fc`): bumped browserslist, @humanfs/node, postcss-selector-parser to patched versions
- This scan confirmed 0 vulnerabilities remaining

## Manual Action Required
- None
