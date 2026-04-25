# Security Scan Report

**Date:** 2026-04-25 19:25 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 2, now fixed)
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires leading `/`, enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` call `authenticateBarista()` (HttpOnly HMAC-SHA256 signed session cookie, 12h expiry); login rate-limited to 5 attempts/15 min per IP
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time comparison, fails closed (500) when key missing; Momence webhook uses `crypto.timingSafeEqual`, fails closed when secret absent
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, `poweredByHeader: false`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns`; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords in `app/`, `lib/`, `components/`; all secrets from `process.env`
8. No localStorage Credentials: PASS — Zero `localStorage`/`sessionStorage` references; auth uses HttpOnly + Secure + SameSite cookies
9. No Error Leaks: PASS — All API routes return generic error strings; no `details: String(error)` or stack traces in responses
10. Safe Health Checks: PASS — Health endpoints return only `{ status: 'ok' }`; auth check returns only `{ authenticated: boolean }`

## Additional Checks
- `dangerouslySetInnerHTML` usage: SAFE — All instances are for JSON-LD structured data via `JSON.stringify()` on hardcoded schema objects (no user input)
- Open redirect protection: PASS — `create-order` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Deduplication: Square webhook deduplicates events via in-memory cache with 10-min TTL and 500-entry cap

## Fixes Applied
- Cleaned dead `lodash` override (lodash not in dependency tree)
- Removed unused `@next/swc-wasm-nodejs@13.5.1` (Next 13 era leftover, not imported anywhere)
- postcss vulnerability (GHSA-qx2v-qp2m-jg93) previously patched; override confirmed active at ^8.5.10

## Manual Action Required
- None
