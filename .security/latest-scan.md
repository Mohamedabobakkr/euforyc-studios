# Security Scan Report

**Date:** 2026-06-19 03:25 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 1, fixed)
- Low: 0

549 packages audited. 0 vulnerabilities remaining after fix.

### Fixed
- **js-yaml <=4.1.1** (moderate): Quadratic-complexity DoS in merge key handling via repeated aliases (GHSA-h67p-54hq-rp68). Transitive dep via eslint -> @eslint/eslintrc -> js-yaml. Lockfile pinned 4.1.1; resolved by `npm audit fix` updating to 4.2.0.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` with strict regex `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — `authenticateBarista()` on all sips routes; HMAC-SHA256 signed HttpOnly cookies; rate-limited login (5 attempts/15min per IP); constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 constant-time comparison on raw body; fails closed when key missing (500); deduplication cache (10min TTL, 500 entry cap)
4. Input Validation: PASS — `safeIdPattern` on order/fulfillment IDs; state transitions validated against whitelist; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99; pickup time validated as future ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy, `poweredByHeader: false`, API `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found; all secrets from `process.env`; `.env` files gitignored
8. No localStorage Credentials: PASS — Auth uses HttpOnly + Secure + SameSite cookies exclusively; no credentials in localStorage
9. No Error Leaks: PASS — Generic error strings to clients; Momence routes only show `details` in development; no `String(error)` or stack traces in responses
10. Safe Health Checks: PASS — No health endpoints expose tokens; auth check returns only `{ authenticated: boolean }`

## Fixes Applied
- js-yaml updated from 4.1.1 to 4.2.0 in package-lock.json (resolves GHSA-h67p-54hq-rp68)

## Manual Action Required
- None
- Informational: CSP includes `'unsafe-inline'` and `'unsafe-eval'` for Facebook Pixel/Google Analytics — consider migrating to nonce-based CSP when feasible (not a vulnerability)
