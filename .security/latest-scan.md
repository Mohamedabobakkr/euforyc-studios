# Security Scan Report

**Date:** 2026-04-08 00:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — `orders/route.ts` and `update-order/route.ts` both call `authenticateBarista()` (HttpOnly HMAC-SHA256 session cookie)
3. Webhook Signatures: PASS — Square webhook fails closed when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing (returns 500); Momence webhook fails closed when `MOMENCE_WEBHOOK_SECRET` missing (returns 401)
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; state transitions enforced via `VALID_TRANSITIONS` map; item quantities capped at 99; input lengths sliced
5. Security Headers: PASS — HSTS (`max-age=63072000; includeSubDomains; preload`), CSP, X-Frame-Options (`SAMEORIGIN`), X-Content-Type-Options (`nosniff`), Referrer-Policy, Permissions-Policy all configured; `poweredByHeader: false`
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; only trusted domains (`*.squarecdn.com`, `*.momence.com`, `euforyc.co.uk`, specific S3 bucket)
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, `sk_live`, `sk_test`, or hardcoded passwords found in `app/`, `lib/`, `components/`
8. No localStorage Credentials: PASS — No `localStorage.setItem` or `localStorage.getItem` calls found; auth uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — All `error.message` exposure gated by `process.env.NODE_ENV === 'development'`; production API responses return generic messages only
10. Safe Health Checks: PASS — All health endpoints return only `{ status: 'ok' }` with no tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
