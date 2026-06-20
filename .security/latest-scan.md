# Security Scan Report

**Date:** 2026-06-20 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 1, fixed)
- Low: 0

549 packages audited (540 prod, 15 optional). 0 vulnerabilities after fix.

### Fixed: js-yaml Quadratic DoS (GHSA-h67p-54hq-rp68)
- **Severity:** Moderate (CVSS 5.3)
- **Package:** js-yaml <=4.1.1 (via eslint -> @eslint/eslintrc)
- **Issue:** Quadratic-complexity DoS in merge key handling via repeated aliases
- **Fix:** Upgraded js-yaml 4.1.1 -> 4.2.0 via `npm audit fix`
- **Build verification:** Pre-existing build failure (Momence API 503) unrelated to fix; confirmed same failure on unmodified main

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

## Fixes Applied
- `3536d9b` fix(security): upgrade js-yaml 4.1.1 -> 4.2.0 (CVE quadratic DoS via eslint -> @eslint/eslintrc)

## Manual Action Required
- **Momence API Build Failure (non-security):** `npm run build` fails because the Momence API returns 503 during static page generation for `/api/momence/events`. This is a runtime/infrastructure issue, not a security vulnerability. Consider adding graceful fallback handling for Momence API unavailability at build time.
