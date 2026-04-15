# Security Scan Report

**Date:** 2026-04-15 11:33 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All 550 packages audited — no known vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires leading `/`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion before any outbound `fetch()` to Square
2. API Auth: PASS — `app/api/sips/orders/route.ts` and `app/api/sips/update-order/route.ts` both call `authenticateBarista()` (HttpOnly signed session cookie) as the first step; unauthorized requests return 401 before any Square interaction
3. Webhook Signatures: PASS — Square webhook in `app/api/sips/webhook/route.ts` uses HMAC-SHA256 with constant-time comparison and fails closed (HTTP 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions restricted to the `VALID_TRANSITIONS` whitelist (PROPOSED→RESERVED→PREPARED→COMPLETED)
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy all present in `next.config.js`; `poweredByHeader: false`; API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains (`*.squarecdn.com`, `squarecdn.com`, `items-images-production.s3.us-west-2.amazonaws.com`, `euforyc.co.uk`, `www.euforyc.co.uk`, `*.momence.com`, `localhost`); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or plaintext passwords in `app/`, `lib/`, `components/`; all secrets sourced from `process.env`
8. No localStorage Credentials: PASS — No `localStorage`/`sessionStorage` references in the codebase; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — Client-visible API error responses return generic strings (e.g., `'Failed to fetch orders'`, `'Failed to update order'`, `'Internal server error'`); Momence route `details` field gated behind `process.env.NODE_ENV === 'development'`; `String(error)` in `app/api/track-event/route.ts:68` is scoped to an internal helper return value and is not emitted to clients
10. Safe Health Checks: PASS — `GET /api/track-event` returns only `{ status: 'ok' }`; no tokens, environment data, or internal configuration leaked

## Fixes Applied
- None needed this scan — repository state is clean. Prior hardening remains in force: Next.js 16.2.1→16.2.3 DoS patch (GHSA-q4gf-8mx6-v5v3), unused `recharts` removal eliminating `lodash@4.17.23` CVEs, and error-message leak suppression.

## Manual Action Required
- None
