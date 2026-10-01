# Security Scan Report

**Date:** 2026-10-01 12:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in `lib/square.ts` blocks `..`, `//`, `\\`, and enforces safe character regex
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` via HttpOnly session cookie
3. Webhook Signatures: PASS — `webhook/route.ts` verifies HMAC-SHA256 signature and fails closed (returns 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing
4. Input Validation: PASS — `update-order/route.ts` validates orderId/fulfillmentUid format with `/^[a-zA-Z0-9_-]+$/` and validates state transitions
5. Security Headers: PASS — HSTS (2-year max-age + preload), CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy all configured in `next.config.js`
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; only specific trusted domains listed in `remotePatterns`
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, `pk_test`, or hardcoded passwords found in `app/`, `lib/`, or `components/`
8. No localStorage Credentials: PASS — `localStorage` only used for analytics UID (`euforyc_uid`), no passwords/tokens/secrets stored
9. No Error Leaks: PASS — All API routes return generic error messages; `details` field in Momence routes is gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — No health check endpoints exist that could expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
