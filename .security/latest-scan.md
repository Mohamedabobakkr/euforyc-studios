# Security Scan Report

**Date:** 2026-04-12 19:35 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 551 packages audited — no known vulnerabilities.
Resolved `next@16.2.3` (via `^16.1.6`) includes the GHSA-q4gf-8mx6-v5v3 DoS fix.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` blocks `..`, `//`, `\\` and enforces `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` (HttpOnly session cookie) before processing
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time comparison; Momence webhook uses `crypto.timingSafeEqual()`; both fail closed when keys are missing
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions checked against whitelist
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy present; `poweredByHeader: false`
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, momence.com, items-images-production S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or plaintext passwords found in `app/`, `lib/`, `components/`
8. No localStorage Credentials: PASS — No `localStorage`/`sessionStorage` usage found; auth is HttpOnly+Secure+SameSite cookie only
9. No Error Leaks: PASS — All API error responses return generic messages; no `details: String(error)` or stack traces exposed
10. Safe Health Checks: PASS — Health endpoints return only `{ status: 'ok' }`; no tokens or internal config

## Fixes Applied
- None needed — repository state is clean. Prior DoS fix (`d8388a4` — next 16.2.1→16.2.3) remains in force via `next@16.2.3` resolution.

## Manual Action Required
- None
