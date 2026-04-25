# Security Scan Report

**Date:** 2026-04-25 11:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

All dependencies audited — no known vulnerabilities. postcss XSS (GHSA-qx2v-qp2m-jg93) patched in prior scan; next updated to 16.2.4; postcss override confirmed active.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires a leading `/`, and enforces `/^\/[a-zA-Z0-9/_-]+$/` on the path portion; all outbound calls gated through this before reaching `https://connect.squareup.com/v2`
2. API Auth: PASS — `app/api/sips/orders/route.ts:46-52` and `app/api/sips/update-order/route.ts:24-30` both call `authenticateBarista()` (HttpOnly HMAC-SHA256 signed session cookie, 12h expiry, derived from `BARISTA_PASSWORD`); login rate-limited to 5 attempts/15 min per IP; unauthorized requests return generic 401
3. Webhook Signatures: PASS — Square webhook (`app/api/sips/webhook/route.ts:124-145`) uses HMAC-SHA256 with constant-time comparison and fails closed (HTTP 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; Momence webhook (`app/api/webhooks/momence/route.ts:37-56`) also fails closed when `MOMENCE_WEBHOOK_SECRET` is absent and uses `crypto.timingSafeEqual`
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions restricted to `VALID_TRANSITIONS` whitelist (PROPOSED->RESERVED->PREPARED->COMPLETED); `create-order` caps item count at 50, modifier count at 20, string lengths at 100/500, quantity at 1-99, and validates `pickupAt` as a reasonable ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), comprehensive CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo disabled), `poweredByHeader: false`, API routes set `Cache-Control: no-store, max-age=0`
6. Image Hostnames: PASS — Only whitelisted domains (`*.squarecdn.com`, `squarecdn.com`, S3 bucket, `euforyc.co.uk`, `www.euforyc.co.uk`, `*.momence.com`, `localhost`); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — Grep for `sk-`, `pk_live_`, `sk_live_`, hardcoded password patterns across `app/`, `lib/`, `components/` yields zero hits; all secrets sourced from `process.env`
8. No localStorage Credentials: PASS — No `localStorage` or `sessionStorage` references in any TS/TSX/JS/JSX files; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — All client-visible API responses return generic error strings; internal `String(error)` in track-event helper is server-side only; Momence routes gate `details:` on `NODE_ENV === 'development'` only
10. Safe Health Checks: PASS — `GET /api/webhooks/momence`, `GET /api/track-event`, and `GET /api/track-purchase` return only `{ status: 'ok' }`; `GET /api/sips/auth` returns only `{ authenticated: boolean }`; no tokens or internal config leaked

## Additional Checks
- `dangerouslySetInnerHTML` usage: SAFE — All instances are for JSON-LD structured data via `JSON.stringify()` on hardcoded schema objects (no user input)
- Open redirect protection: PASS — `create-order` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Deduplication: Square webhook deduplicates events via in-memory cache with 10-min TTL and 500-entry cap

## Fixes Applied
- None needed — postcss vulnerability already resolved in prior scan; next updated to 16.2.4

## Manual Action Required
- None
