# Security Scan Report

**Date:** 2026-04-10 11:43 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

Dependency tree is clean: 551 packages audited, 0 vulnerabilities reported. The `lodash` override (`4.18.1`) in package.json continues to neutralize the transitive lodash vulnerabilities from previously-removed `recharts`.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in lib/square.ts:40 blocks `..`, `//`, `\\`, requires `/` prefix, and enforces strict `/^\/[a-zA-Z0-9/_-]+$/` on the path portion before any Square API call
2. API Auth: PASS — `app/api/sips/orders/route.ts:46` and `app/api/sips/update-order/route.ts:25` both call `authenticateBarista()` and 401 on failure; session is HMAC-SHA256 signed via `BARISTA_PASSWORD`-derived key
3. Webhook Signatures: PASS — Square (`app/api/sips/webhook/route.ts:124`) returns 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing and uses constant-time HMAC compare; Momence (`app/api/webhooks/momence/route.ts:38`) fails closed when `MOMENCE_WEBHOOK_SECRET` is missing and uses `crypto.timingSafeEqual`
4. Input Validation: PASS — Order IDs validated via `/^[a-zA-Z0-9_-]+$/` in update-order/route.ts:42; state transitions checked against `VALID_TRANSITIONS` whitelist; create-order caps item count (50), quantity (1-99), modifiers (20), string lengths (100/500)
5. Security Headers: PASS — HSTS (2yr+preload+includeSubDomains), X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, CSP (with frame-ancestors 'self'), Cache-Control no-store on /api/* — all present in next.config.js
6. Image Hostnames: PASS — Only explicit domains whitelisted (squarecdn.com, items-images-production.s3.us-west-2.amazonaws.com, euforyc.co.uk, *.momence.com, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — Grep for `sk_live_`, `pk_live_`, `BEGIN PRIVATE`, and inline passwords in app/ lib/ components/ returns no matches; all tokens (Square, Momence, Facebook, Barista) read from `process.env`
8. No localStorage Credentials: PASS — Grep for `localStorage` across app/ lib/ components/ returns no matches; barista session lives only in `__Secure-barista-session` HttpOnly+SameSite cookie
9. No Error Leaks: PASS — No API response returns `error.message`, `String(error)`, or stack traces. The one `String(error)` in app/api/track-event/route.ts:68 is inside a private helper whose caller (line 177) only returns `{ success, event_id, pixel: business_unit }` — the error string is console-logged, never sent to the client. All other routes return generic messages and gate any `details` field behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — `GET /api/track-event`, `GET /api/track-purchase`, and `GET /api/webhooks/momence` all return exactly `{ status: 'ok' }` with no env vars, pixel IDs, tokens, or internal config exposed

## Fixes Applied
- None needed

## Manual Action Required
- None
