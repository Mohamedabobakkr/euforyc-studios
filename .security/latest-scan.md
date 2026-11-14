# Security Scan Report

**Date:** 2026-11-14 08:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\`; requires `/` prefix; allows only `[a-zA-Z0-9/_-]` in path segment
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` (HMAC-SHA256 signed HttpOnly cookie with expiry)
3. Webhook Signatures: PASS — fails closed when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing (returns 500); HMAC-SHA256 verified with constant-time comparison
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated against `/^[a-zA-Z0-9_-]+$/`; state transitions constrained to `VALID_TRANSITIONS` map
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP (restrictive), X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, poweredByHeader disabled
6. Image Hostnames: PASS — uses custom image loader (`lib/imageLoader.ts`), no `remotePatterns` or `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — grep for `sk-`, `sk_live`, `pk_live`, hardcoded passwords returned no matches in app/lib/components
8. No localStorage Credentials: PASS — no `localStorage.setItem`/`getItem` calls involving password, token, secret, key, credential, or auth
9. No Error Leaks: PASS — all API routes return generic error messages to clients; Momence error details gated behind `NODE_ENV === 'development'`; enquiry route logs `error.message` server-side only, client gets `'Enquiry could not be delivered'`
10. Safe Health Checks: PASS — no health/status endpoints exist; no endpoints expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
