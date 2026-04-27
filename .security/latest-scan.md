# Security Scan Report

**Date:** 2026-04-27 03:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` rejects `..`, `//`, `\\`, requires leading `/`, enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` call `authenticateBarista()` (HttpOnly HMAC-SHA256 signed session cookie, 12h expiry); login rate-limited to 5 attempts/15 min per IP with constant-time password comparison
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time comparison; fails closed (500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing; deduplicates events via in-memory cache (10-min TTL, 500-entry cap)
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted via `VALID_TRANSITIONS`; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP with strict directives, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo denied), `poweredByHeader: false`, API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns` (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords in `app/`, `lib/`, `components/`; all secrets via `process.env`; `.env` and `.env*.local` properly gitignored
8. No localStorage Credentials: PASS — Zero `localStorage`/`sessionStorage` usage in codebase; auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — All API routes return generic error strings ("Failed to fetch orders", "Failed to update order", etc.); Momence client only exposes `details` when `NODE_ENV === 'development'`; no `String(error)` or stack traces in responses
10. Safe Health Checks: PASS — No health check endpoints exist; auth check endpoint (`GET /api/sips/auth`) returns only `{ authenticated: boolean }`

## Additional Checks
- Open redirect protection: PASS — `create-order/route.ts` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Telegram notification: PASS — HTML-escaped via `escapeHtml()` before sending to Telegram API; fails silently (no user-facing leak)
- Momence client: PASS — API token sent server-side only; error sanitization strips internal details in production
- `dangerouslySetInnerHTML`: Not found in API routes or security-sensitive paths

## Fixes Applied
- None needed

## Manual Action Required
- None
