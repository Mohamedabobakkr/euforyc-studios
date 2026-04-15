# Security Scan Report

**Date:** 2026-04-15 19:31 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 551 packages audited — no known vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires leading `/`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion before any outbound `fetch()` to Square
2. API Auth: PASS — `app/api/sips/orders/route.ts:46-52` and `app/api/sips/update-order/route.ts:24-30` both call `authenticateBarista()` (HttpOnly signed session cookie derived from `BARISTA_PASSWORD`) before any Square interaction; unauthorized requests return 401
3. Webhook Signatures: PASS — Square webhook (`app/api/sips/webhook/route.ts:124-145`) uses HMAC-SHA256 with constant-time comparison and fails closed (HTTP 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; Momence webhook (`app/api/webhooks/momence/route.ts:37-56`) also fails closed when `MOMENCE_WEBHOOK_SECRET` is absent and uses `crypto.timingSafeEqual`
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions restricted to the `VALID_TRANSITIONS` whitelist (PROPOSED→RESERVED→PREPARED→COMPLETED)
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy all present in `next.config.js`; `poweredByHeader: false`; API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (`*.squarecdn.com`, `squarecdn.com`, `items-images-production.s3.us-west-2.amazonaws.com`, `euforyc.co.uk`, `www.euforyc.co.uk`, `*.momence.com`, `localhost`); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, `sq0atp-`, or `EAAA...` patterns in `app/`, `lib/`, `components/`; all secrets sourced from `process.env`
8. No localStorage Credentials: PASS — No `localStorage.setItem`/`localStorage.getItem` references in the codebase; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — Client-visible API error responses return generic strings (`'Failed to fetch orders'`, `'Failed to update order'`, `'Internal server error'`); no `details: String(error)` or stack traces returned to clients
10. Safe Health Checks: PASS — `GET /api/webhooks/momence` returns only `{ status: 'ok' }`; no tokens, environment data, or internal configuration leaked

## Fixes Applied
- None needed this scan — repository state is clean. Prior hardening remains in force: Next.js DoS patch (GHSA-q4gf-8mx6-v5v3), unused `recharts` removal eliminating `lodash@4.17.23` CVEs, and error-message leak suppression.

## Manual Action Required
- None
