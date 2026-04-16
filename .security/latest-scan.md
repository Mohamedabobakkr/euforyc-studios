# Security Scan Report

**Date:** 2026-04-16 03:28 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 466 packages audited — no known vulnerabilities. `next` resolves to 16.2.4 via `^16.1.6`, which includes the fix for GHSA-q4gf-8mx6-v5v3 DoS.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires a leading `/`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion before any outbound `fetch()` to Square
2. API Auth: PASS — `app/api/sips/orders/route.ts:46-52` and `app/api/sips/update-order/route.ts:24-30` both call `authenticateBarista()` (HttpOnly signed session cookie derived from `BARISTA_PASSWORD`) before any Square interaction; unauthorized requests return 401
3. Webhook Signatures: PASS — Square webhook (`app/api/sips/webhook/route.ts:124-145`) uses HMAC-SHA256 with constant-time comparison and fails closed (HTTP 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; Momence webhook (`app/api/webhooks/momence/route.ts:37-56`) also fails closed when `MOMENCE_WEBHOOK_SECRET` is absent and uses `crypto.timingSafeEqual`
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions restricted to the `VALID_TRANSITIONS` whitelist (PROPOSED→RESERVED→PREPARED→COMPLETED); `create-order` caps item count at 50, modifier count at 20, string lengths at 100/500, and validates `pickupAt` as a reasonable ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy all present in `next.config.js`; `poweredByHeader: false`; API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (`*.squarecdn.com`, `squarecdn.com`, `items-images-production.s3.us-west-2.amazonaws.com`, `euforyc.co.uk`, `www.euforyc.co.uk`, `*.momence.com`, `localhost`); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, `sq0atp-`, `EAAA...`, `xox[bp]-`, or `AKIA...` patterns in `app/`, `lib/`, `components/`; all secrets sourced from `process.env`
8. No localStorage Credentials: PASS — No `localStorage.*` or `sessionStorage.*` references anywhere in the codebase; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — Client-visible API error responses return generic strings (`'Failed to fetch orders'`, `'Failed to update order'`, `'Failed to create order. Please try again.'`, `'Internal server error'`); Momence routes gate any `details:` field on `process.env.NODE_ENV === 'development'`; the lone `String(error)` in `app/api/track-event/route.ts:68` is returned from an internal helper and only reaches `console.error` — the HTTP response at line 184 is generic
10. Safe Health Checks: PASS — `GET /api/webhooks/momence`, `GET /api/track-event`, and `GET /api/track-purchase` all return only `{ status: 'ok' }`; `GET /api/sips/auth` returns only `{ authenticated: boolean }`; no tokens, environment data, or internal configuration leaked

## Fixes Applied
- None needed this scan — repository state is clean. Prior hardening remains in force: unused `recharts` removal eliminating `lodash@4.17.23` CVEs, and error-message leak suppression across the API surface.

## Manual Action Required
- None
