# Security Scan Report

**Date:** 2026-11-25 03:24 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces strict regex
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both validate HttpOnly session via `authenticateBarista()`
3. Webhook Signatures: PASS — fails closed (returns 500 when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing); HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — order IDs validated with `/^[a-zA-Z0-9_-]+$/`; quantities, lengths, and dates all bounded
5. Security Headers: PASS — HSTS (2 years + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — uses custom loader (`lib/imageLoader.ts`), no wildcard `hostname` in next.config.js
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or inline passwords found in app/, lib/, components/
8. No localStorage Credentials: PASS — only `euforyc_uid` (analytics UUID) stored in localStorage
9. No Error Leaks: PASS — all API routes return generic error messages; `error.details` gated to `NODE_ENV === 'development'` only
10. Safe Health Checks: PASS — no health check endpoints exist; no tokens or config exposed

## Fixes Applied
- None needed

## Manual Action Required
- None
