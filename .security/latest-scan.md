# Security Scan Report

**Date:** 2026-06-28 19:26 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

549 packages audited. 0 vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`; enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HttpOnly session cookies; login rate-limited 5/15min per IP; constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 with constant-time comparison; fails closed (500) when key missing; dedup cache with 10min TTL
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99
5. Security Headers: PASS — HSTS (63072000s; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, poweredByHeader: false, API Cache-Control: no-store
6. Image Hostnames: PASS — only whitelisted domains in remotePatterns; no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords found; all secrets from process.env
8. No localStorage Credentials: PASS — only euforyc_uid (anonymous visitor ID) stored; auth uses HttpOnly cookies
9. No Error Leaks: PASS — all API routes return generic error strings; no String(error) or stack traces in responses
10. Safe Health Checks: PASS — no health check endpoints exist; auth check returns only `{ authenticated: boolean }`

## Fixes Applied
- None needed

## Manual Action Required
- None

## Recommendations (non-blocking)
- CSP uses `'unsafe-inline'` and `'unsafe-eval'` in script-src (required for analytics integrations); consider nonce-based CSP when feasible
- Add max-length check on order IDs for defense-in-depth (currently format-validated but unbounded)
- Remove `http://localhost` from `images.remotePatterns` in production builds
