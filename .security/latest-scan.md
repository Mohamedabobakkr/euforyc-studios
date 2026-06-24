# Security Scan Report

**Date:** 2026-06-24 08:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 1 — js-yaml@4.1.1 DoS via merge key aliasing, fixed by lockfile update to 4.2.0)
- Low: 0

554 packages audited (540 prod, 15 optional). 0 vulnerabilities after fix.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` blocks `..`, `//`, `\\`; requires leading `/`; enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion before query string
2. API Auth: PASS — `authenticateBarista()` on all sips routes; HMAC-SHA256 signed HttpOnly session cookies with 12h expiry; login rate-limited to 5 attempts/15 min per IP; constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 constant-time comparison on raw body; fails closed with 500 when key missing; rejects invalid signatures with 403; deduplication cache (10 min TTL, 500 entry cap)
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99; pickup time validated as future ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP (default-src 'self', object-src 'none', base-uri 'self', frame-ancestors 'self'), X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy, `poweredByHeader: false`, API `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found; all secrets from `process.env`; `.env` files gitignored
8. No localStorage Credentials: PASS — Auth uses HttpOnly + Secure + SameSite cookies exclusively; localStorage only stores anonymous UUID (`euforyc_uid`)
9. No Error Leaks: PASS — Generic error strings to clients; `details` field only in NODE_ENV=development; no stack traces exposed
10. Safe Health Checks: PASS — No health check endpoints exist; auth check returns only `{ authenticated: boolean }`

## Additional Checks
- Open redirect protection: PASS — `create-order/route.ts` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Cookie security: PASS — `__Secure-` prefix, HttpOnly, Secure (in prod), SameSite=lax, 12h maxAge, unique JTI per token
- No `eval()` or `new Function()` usage found
- No `NEXT_PUBLIC_` env vars exposing secrets

## CSP Advisory (informational, not a vulnerability)
- `script-src` includes `'unsafe-inline'` and `'unsafe-eval'` — required by Facebook Pixel and Google Analytics integrations. Consider migrating to nonce-based CSP when feasible.

## Fixes Applied
- `package-lock.json`: Updated js-yaml from 4.1.1 to 4.2.0 (fixes GHSA-h67p-54hq-rp68 — quadratic-complexity DoS in merge key handling via repeated aliases). Transitive dependency of eslint only, not used in application code. Risk was low but fix is zero-effort.

## Manual Action Required
- None
