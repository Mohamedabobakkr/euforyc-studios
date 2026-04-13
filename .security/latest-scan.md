# Security Scan Report

**Date:** 2026-04-13 03:43 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 551 packages audited — no known vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` requires leading `/`, blocks `..`, `//`, `\\`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion
2. API Auth: PASS — `app/api/sips/orders/route.ts` and `app/api/sips/update-order/route.ts` both call `authenticateBarista()` (HttpOnly signed session cookie) before any Square API interaction
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time comparison; Momence webhook uses `crypto.timingSafeEqual()`; both fail closed when keys are missing
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions validated against the `VALID_TRANSITIONS` whitelist
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy present; `poweredByHeader: false`
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, items-images-production S3 bucket, *.momence.com, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or plaintext passwords found in `app/`, `lib/`, `components/`; all secrets sourced from environment
8. No localStorage Credentials: PASS — No `localStorage`/`sessionStorage` references anywhere in the codebase; auth is HttpOnly + Secure + SameSite cookie only
9. No Error Leaks: PASS — All error detail exposure (in `app/api/momence/*`) is gated behind `process.env.NODE_ENV === 'development'`; production returns generic messages; no `details: String(error)` or stack traces emitted
10. Safe Health Checks: PASS — `GET /api/webhooks/momence` returns only `{ status: 'ok' }`; no tokens or internal config exposed

## Fixes Applied
- None needed — repository state is clean. Prior fixes remain in force: Next.js DoS patch (d8388a4 — 16.2.1→16.2.3), lodash CVE via recharts removal (7a47af6), error-message leak suppression.

## Manual Action Required
- None
