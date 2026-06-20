# Security Scan Report

**Date:** 2026-06-20 19:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 1 — fixed)
- Low: 0

549 packages audited (540 prod, 15 optional). 0 vulnerabilities remaining.

### Fixed
- **js-yaml ≤4.1.1** (moderate, GHSA-h67p-54hq-rp68): Quadratic-complexity DoS in merge key handling via repeated aliases. Transitive dependency via `eslint` → `@eslint/eslintrc`. Updated 4.1.1 → 4.2.0 via `npm audit fix`.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` with strict regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — `authenticateBarista()` on all sips routes; HMAC-SHA256 signed HttpOnly cookies; rate-limited login (5 attempts/15min per IP); constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 constant-time comparison on raw body; fails closed when key missing (500); deduplication cache (10min TTL, 500 entry cap)
4. Input Validation: PASS — `safeIdPattern` on order/fulfillment IDs; state transitions validated against whitelist; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99; pickup time validated as future ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy, `poweredByHeader: false`, API `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found; all secrets from `process.env`; `.env` files gitignored
8. No localStorage Credentials: PASS — Auth uses HttpOnly + Secure + SameSite cookies exclusively; localStorage only stores anonymous UUID (`euforyc_uid`)
9. No Error Leaks: PASS — Generic error strings to clients; Momence routes only show `details` in development; no `String(error)` or stack traces in responses
10. Safe Health Checks: PASS — No health endpoints expose tokens; auth check returns only `{ authenticated: boolean }`

## Additional Checks
- Open redirect protection: PASS — `create-order/route.ts` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Cookie security: PASS — `__Secure-` prefix, HttpOnly, Secure (in prod), SameSite=lax, 12h maxAge, unique JTI per token
- No `eval()` or `new Function()` usage found
- No `NEXT_PUBLIC_` env vars exposing secrets

## Fixes Applied
- `87a47a7` — fix(security): bump js-yaml 4.1.1→4.2.0 to resolve GHSA-h67p-54hq-rp68 DoS

## Manual Action Required
- None
