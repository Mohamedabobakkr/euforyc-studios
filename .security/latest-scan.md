# Security Scan Report

**Date:** 2026-04-16 19:34 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 551 packages audited (prod 542, optional 37) — `npm audit --json` returns `total: 0` across every severity bucket. `next@16.2.3` (per `package.json`) carries the GHSA-q4gf-8mx6-v5v3 DoS fix; no override or pin is required.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires a leading `/`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion; every outbound call in `squareFetch()` (`lib/square.ts:56-88`) runs through this gate before hitting `https://connect.squareup.com/v2`
2. API Auth: PASS — `app/api/sips/orders/route.ts:46-52` and `app/api/sips/update-order/route.ts:24-30` both call `authenticateBarista()` (HttpOnly signed session cookie derived from `BARISTA_PASSWORD`, 12h expiry, HMAC-SHA256 signed) before any Square interaction; unauthorized requests return 401 with a generic error
3. Webhook Signatures: PASS — Square webhook (`app/api/sips/webhook/route.ts:124-145`) uses HMAC-SHA256 with constant-time comparison and fails closed (HTTP 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; Momence webhook (`app/api/webhooks/momence/route.ts:37-56`) also fails closed when `MOMENCE_WEBHOOK_SECRET` is absent and uses `crypto.timingSafeEqual`
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/` (`app/api/sips/update-order/route.ts:42-48`); state transitions restricted to the `VALID_TRANSITIONS` whitelist (PROPOSED→RESERVED→PREPARED→COMPLETED); `create-order` caps item count at 50, modifier count at 20, string lengths at 100/500, quantity at 99, and rejects stale `pickupAt` timestamps
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP with no `'unsafe-*'` in `default-src`/`object-src`/`base-uri`/`form-action`/`frame-ancestors`, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy: camera=(), microphone=(), geolocation=() all present in `next.config.js:53-114`; `poweredByHeader: false`; API routes set `Cache-Control: no-store, max-age=0`
6. Image Hostnames: PASS — Only whitelisted domains (`*.squarecdn.com`, `squarecdn.com`, `items-images-production.s3.us-west-2.amazonaws.com`, `euforyc.co.uk`, `www.euforyc.co.uk`, `*.momence.com`, `localhost`); no `hostname: '**'` wildcard in `next.config.js:11-40`
7. No Hardcoded Secrets: PASS — Grep for `sk-`, `pk_live_`, `sq0atp-`, `xox[bp]-`, `AKIA`, `-----BEGIN`, and inline `password:'…'` patterns across `app/`, `lib/`, `components/` yields zero hits; all secrets sourced from `process.env`
8. No localStorage Credentials: PASS — No `localStorage.*` or `sessionStorage.*` references anywhere in the TS/TSX/JS/JSX tree; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — Client-visible API error responses return generic strings (`'Failed to fetch orders'`, `'Failed to update order'`, `'Failed to create order. Please try again.'`, `'Internal server error'`); no `details: String(error)` or stack-trace fields returned from any route handler; the lone `String(error)` in `app/api/track-event/route.ts:68` is an internal helper return consumed only by `console.error`, never reaching the HTTP response at line 184
10. Safe Health Checks: PASS — `GET /api/webhooks/momence`, `GET /api/track-event`, and `GET /api/track-purchase` return only `{ status: 'ok' }`; `GET /api/sips/auth` returns only `{ authenticated: boolean }`; no tokens, environment data, or internal configuration leaked

## Fixes Applied
- None needed this scan — repository state is clean. Prior hardening remains in force: unused `recharts` removal eliminating `lodash@4.17.23` CVEs, SSRF allowlist on `validateSquarePath()`, HMAC-signed barista session cookies, and error-message leak suppression across the API surface.

## Manual Action Required
- None
