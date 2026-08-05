# Security Scan Report

**Date:** 2026-08-05 19:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1 - brace-expansion DoS via unbounded arrays, GHSA-rgw5-rvv9-x895)
- Medium: 0 (was 2 - postcss path traversal via sourceMappingURL GHSA-fxqj-rqcc-2cmp, plus next transitive dep)
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` blocks `..`, `//`, `\\`; requires leading `/`; enforces strict regex `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` which validates HMAC-SHA256 signed HttpOnly session cookies with 12h expiry; login rate-limited (5 attempts/15min); constant-time password comparison
3. Webhook Signatures: PASS — `webhook/route.ts` verifies Square HMAC-SHA256 signature with constant-time comparison; fails closed with 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; rejects invalid signatures with 403; deduplication cache prevents replay
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99; pickup time validated as future ISO date; redirect URLs validated against allowlist
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP with strict directives, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo denied), `poweredByHeader: false`, API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns` (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found in source; all secrets sourced from `process.env`; `.env` files properly gitignored
8. No localStorage Credentials: PASS — Auth uses HttpOnly + Secure + SameSite cookies exclusively; only `euforyc_uid` (anonymous tracking ID) in localStorage
9. No Error Leaks: PASS — All API routes return generic error strings to clients; no stack traces in production responses
10. Safe Health Checks: PASS — No health check endpoints exist; auth check returns only `{ authenticated: boolean }`; no tokens or config exposed

## Fixes Applied
- `776a8fc` fix(security): update postcss to 8.5.25 and add brace-expansion 5.0.9 override — resolves 1 high + 2 moderate vulnerabilities

## Manual Action Required
- Build fails due to Momence API being temporarily unavailable (pre-existing, unrelated to security). Monitor and retry when Momence API recovers.
