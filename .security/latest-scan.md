# Security Scan Report

**Date:** 2026-06-28 17:45 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 1 -- js-yaml DoS via merge key aliases GHSA-h67p-54hq-rp68, fixed)
- Low: 0

554 packages audited (540 prod, 15 optional). 0 vulnerabilities remaining.

## Code Security Checks
1. SSRF Protection: PASS -- validateSquarePath() blocks `..`, `//`, `\\`; enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS -- orders and update-order routes use authenticateBarista() with HttpOnly session cookies; login rate-limited 5/15min per IP; constant-time password comparison
3. Webhook Signatures: PASS -- HMAC-SHA256 with constant-time comparison; fails closed (500) when key missing; dedup cache with 10min TTL
4. Input Validation: PASS -- orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99
5. Security Headers: PASS -- HSTS (63072000s; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, poweredByHeader: false, API Cache-Control: no-store
6. Image Hostnames: PASS -- only whitelisted domains in remotePatterns; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS -- no sk-, pk_live, or hardcoded passwords found; all secrets from process.env
8. No localStorage Credentials: PASS -- only euforyc_uid (anonymous visitor ID) stored; auth uses HttpOnly cookies
9. No Error Leaks: PASS -- all API routes return generic error strings; no String(error) or stack traces in responses
10. Safe Health Checks: PASS -- no health check endpoints exist; auth check returns only `{ authenticated: boolean }`

## Fixes Applied
- Upgraded js-yaml from <=4.1.1 to 4.2.0+ via npm audit fix (eslint > @eslint/eslintrc > js-yaml)

## Manual Action Required
- Build currently fails due to Momence API returning 503 (transient external service issue, not security-related). Monitor and retry when Momence is back up.
