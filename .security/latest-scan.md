# Security Scan Report

**Date:** 2026-09-05 03:35 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1, fixed)
- Moderate: 0 (was 1, fixed)
- Low: 0 (was 1, fixed)

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
- `67103fc` fix(security): bump transitive deps to resolve 3 npm audit vulnerabilities
  - browserslist 4.28.1 → 4.28.9 (high: OOM via unbounded cache + crash via untrusted browserslist-stats.json)
  - @humanfs/node 0.16.7 → 0.16.8 (moderate: recursive copy follows symlinks outside source tree)
  - postcss-selector-parser 6.1.2 → 6.1.4 (low: DoS via uncontrolled AST recursion)

## Manual Action Required
- None — all vulnerabilities resolved via semver-compatible bumps
