# Security Scan Report

**Date:** 2026-05-19 19:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 1 — fixed in prior commit)
- Low: 0

549 packages audited. 0 vulnerabilities remaining.
Fixed: brace-expansion 5.0.5 → 5.0.6 (GHSA-jxxr-4gwj-5jf2, moderate DoS via large numeric ranges bypassing `max` protection). Transitive dep of eslint-config-next → @typescript-eslint/parser → @typescript-eslint/typescript-estree → minimatch.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts:40-54` blocks `..`, `//`, `\\`; requires leading `/`; enforces `/^\/[a-zA-Z0-9/_-]+$/` on path portion before query string
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` which validates HMAC-SHA256 signed HttpOnly session cookies with 12h expiry; login rate-limited to 5 attempts/15 min per IP; constant-time password comparison
3. Webhook Signatures: PASS — `webhook/route.ts` verifies Square HMAC-SHA256 signature with constant-time comparison; fails closed with 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; rejects invalid signatures with 403; deduplicates events via in-memory cache (10 min TTL, 500 entry cap)
4. Input Validation: PASS — `orderId`/`fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted via `VALID_TRANSITIONS`; create-order caps items at 50, modifiers at 20, strings at 100/500 chars, quantity 1-99; pickup time validated as future ISO date
5. Security Headers: PASS — HSTS (max-age=63072000; includeSubDomains; preload), CSP with strict directives (default-src 'self', object-src 'none', base-uri 'self', frame-ancestors 'self'), X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geo denied), `poweredByHeader: false`, API routes set `Cache-Control: no-store`
6. Image Hostnames: PASS — Only whitelisted domains in `remotePatterns` (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live_`, or hardcoded passwords found in `app/`, `lib/`, `components/`; all secrets sourced from `process.env`; `.env` and `.env*.local` properly gitignored
8. No localStorage Credentials: PASS — Zero `localStorage`/`sessionStorage` credential usage found; auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — All API routes return generic error strings to clients; Momence client only includes `details` when `NODE_ENV === 'development'`; no `String(error)` or stack traces in API responses
10. Safe Health Checks: PASS — No health check endpoints exist; auth check endpoint (`GET /api/sips/auth`) returns only `{ authenticated: boolean }` with no internal config

## Additional Checks
- `dangerouslySetInnerHTML` usage: SAFE — All instances are JSON-LD structured data via `JSON.stringify()` on hardcoded schema objects (no user input)
- Open redirect protection: PASS — `create-order/route.ts` validates redirect origin against `ALLOWED_ORIGINS` whitelist
- Telegram notification XSS: PASS — `escapeHtml()` in `lib/notify.ts` sanitizes user-supplied `customerName` and `note` before HTML rendering
- Cookie security: PASS — `__Secure-` prefix, HttpOnly, Secure (in prod), SameSite=lax, 12h maxAge, unique JTI per token
- No `eval()` or `new Function()` usage found
- No `NEXT_PUBLIC_` env vars exposing secrets
- Logout endpoint: PASS — properly clears session cookie with maxAge=0

## Fixes Applied
- `ca157cd` fix(security): upgrade brace-expansion 5.0.5 → 5.0.6 (GHSA-jxxr-4gwj-5jf2) — moderate DoS via large numeric range bypassing max protection (applied in prior scan run)

## Manual Action Required
- None — all vulnerabilities resolved, all code checks pass
