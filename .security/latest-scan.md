# Security Scan Report

**Date:** 2026-04-13 11:48 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 551 packages audited — no known vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` requires leading `/`, rejects `..`, `//`, `\\`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion before any outbound `fetch()` to Square
2. API Auth: PASS — `app/api/sips/orders/route.ts` and `app/api/sips/update-order/route.ts` both call `authenticateBarista()` (HttpOnly signed session cookie, HMAC-SHA256 signed with `BARISTA_PASSWORD`-derived key) as the first step; unauthorized requests return 401 before any Square interaction
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time comparison and returns 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; Momence webhook uses `crypto.timingSafeEqual()` and explicitly fails closed when `MOMENCE_WEBHOOK_SECRET` is missing
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions restricted to the `VALID_TRANSITIONS` whitelist (PROPOSED→RESERVED→PREPARED→COMPLETED)
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy all present in `next.config.js`; `poweredByHeader: false`; API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (`*.squarecdn.com`, `squarecdn.com`, `items-images-production.s3.us-west-2.amazonaws.com`, `euforyc.co.uk`, `www.euforyc.co.uk`, `*.momence.com`, `localhost`); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or plaintext passwords in `app/`, `lib/`, `components/`; all secrets sourced from `process.env`
8. No localStorage Credentials: PASS — No `localStorage`/`sessionStorage` references in the codebase; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — All API error responses return generic strings (e.g., `'Failed to fetch orders'`, `'Failed to update order'`, `'Internal server error'`); no `details: String(error)` or stack-trace exposure; any dev-only diagnostics are gated behind `process.env.NODE_ENV === 'development'`
10. Safe Health Checks: PASS — `GET /api/webhooks/momence` returns only `{ status: 'ok' }`; no tokens, environment data, or internal configuration leaked

## Fixes Applied
- None needed — repository state is clean. Prior fixes remain in force: unused `recharts` removal eliminating `lodash@4.17.23` CVEs (7a47af6), error-message leak suppression (7a47af6), Next.js 16.2.1→16.2.3 DoS patch (d8388a4).

## Manual Action Required
- None
