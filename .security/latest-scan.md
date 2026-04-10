# Security Scan Report

**Date:** 2026-04-10 03:40 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

(542 production dependencies, 578 total — all clean)

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in lib/square.ts:40 blocks `..`, `//`, `\\` and enforces strict regex `/^\/[a-zA-Z0-9/_-]+$/` on the path portion
2. API Auth: PASS — Both app/api/sips/orders/route.ts and app/api/sips/update-order/route.ts invoke `authenticateBarista()` (HttpOnly cookie + HMAC-SHA256 signed session token, 12h expiry)
3. Webhook Signatures: PASS — Square webhook (app/api/sips/webhook/route.ts) and Momence webhook (app/api/webhooks/momence/route.ts) both verify HMAC-SHA256 with constant-time comparison and fail closed (500/401) when their signing secret is missing
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; customer name/note length-capped; pickup time sanity-checked; item count ≤50, quantity 1–99
5. Security Headers: PASS — HSTS (2yr+preload), X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, strict CSP with allow-listed third parties, Referrer-Policy, Permissions-Policy, X-XSS-Protection all configured in next.config.js
6. Image Hostnames: PASS — Only whitelisted hosts (squarecdn.com, items-images-production.s3.us-west-2.amazonaws.com, euforyc.co.uk, *.momence.com, localhost); no wildcard `hostname: '**'`
7. No Hardcoded Secrets: PASS — All tokens (Square, Telegram, Momence, Meta CAPI) read from `process.env.*`; no `sk-`, `pk_live`, or plaintext passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — No `localStorage`/`sessionStorage` usage anywhere; barista auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — All API routes return generic messages (`'Failed to fetch orders'`, `'Internal server error'`, etc.); Momence routes only expose `details` when `NODE_ENV === 'development'` (undefined in production)
10. Safe Health Checks: PASS — GET handlers in track-event, track-purchase, and webhooks/momence return only `{ status: 'ok' }`; no tokens, env vars, or internal config exposed

## Fixes Applied
- None needed

## Manual Action Required
- None
