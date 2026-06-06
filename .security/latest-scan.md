# Security Scan Report

**Date:** 2026-06-06 11:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

549 packages audited (540 prod, 15 optional). 0 vulnerabilities found.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` blocks `..`, `//`, `\\`; requires leading `/`; enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion before query string
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` which validates HMAC-SHA256 signed HttpOnly session cookies with 12h expiry; login rate-limited to 5 attempts/15 min per IP; constant-time password comparison
3. Webhook Signatures: PASS — `webhook/route.ts` verifies Square HMAC-SHA256 signature with constant-time comparison; fails closed with 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; rejects invalid signatures with 403; deduplicates events via in-memory cache (10 min TTL, 500 entry cap)
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted via `VALID_TRANSITIONS`; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99; pickup time validated as future ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP with strict directives (default-src 'self', object-src 'none', base-uri 'self', frame-ancestors 'self'), X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo denied), `poweredByHeader: false`, API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns` (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found in `app/`, `lib/`, `components/`; all secrets sourced from `process.env`; `.env` and `.env*.local` properly gitignored
8. No localStorage Credentials: PASS — Only `euforyc_uid` (random anonymous tracking ID) stored in localStorage; auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — All API routes return generic error strings to clients; Momence routes only include `details` when `NODE_ENV === 'development'`; no `String(error)` or stack traces in API responses
10. Safe Health Checks: PASS — No health check endpoints exist; auth check endpoint (`GET /api/sips/auth`) returns only `{ authenticated: boolean }` with no internal config

## Additional Checks
- `dangerouslySetInnerHTML` usage: SAFE — All instances are JSON-LD structured data via `JSON.stringify()` on hardcoded schema objects (no user input)
- Open redirect protection: PASS — `create-order/route.ts` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Telegram notification XSS: PASS — `escapeHtml()` in `lib/notify.ts` sanitizes user-supplied `customerName` and `note` before HTML rendering
- Cookie security: PASS — `__Secure-` prefix, HttpOnly, Secure (in prod), SameSite=lax, 12h maxAge, unique JTI per token
- Logout endpoint: PASS — properly clears session cookie with maxAge=0
- No `eval()` or `new Function()` usage found
- No `NEXT_PUBLIC_` env vars exposing secrets
- No sensitive files committed to git (`.env` files properly gitignored)

## CSP Advisory (informational, not a vulnerability)
- `script-src` includes `'unsafe-inline'` and `'unsafe-eval'` — required by Facebook Pixel and Google Analytics integrations. These weaken XSS protection but are standard for sites using third-party tracking. Consider migrating to nonce-based CSP when feasible.

## Fixes Applied
- None needed — all checks pass

## Manual Action Required
- None
