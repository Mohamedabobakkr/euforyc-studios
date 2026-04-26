# Security Scan Report

**Date:** 2026-04-26 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires leading `/`, enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` call `authenticateBarista()` (HttpOnly HMAC-SHA256 signed session cookie, 12h expiry); login rate-limited to 5 attempts/15 min per IP
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time comparison, fails closed (500) when key missing
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, `poweredByHeader: false`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns`; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords in `app/`, `lib/`, `components/`; all secrets from `process.env`
8. No localStorage Credentials: PASS — Zero `localStorage`/`sessionStorage` references; auth uses HttpOnly + Secure + SameSite cookies
9. No Error Leaks: PASS — Momence routes guard error details behind `NODE_ENV === 'development'`; Sips routes return generic error strings only; no stack traces in responses
10. Safe Health Checks: PASS — No health endpoints expose tokens or internal config; auth check returns only `{ authenticated: boolean }`

## Additional Checks
- `npm audit --json`: 576 packages audited, 0 vulnerabilities across all severity levels
- Open redirect protection: PASS — `create-order` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Deduplication: Square webhook deduplicates events via in-memory cache with 10-min TTL and 500-entry cap
- Password cleared from React state immediately after successful auth (barista page line 127)

## Fixes Applied
- None needed

## Manual Action Required
- None
