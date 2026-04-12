# Security Scan Report

**Date:** 2026-04-12 12:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

### Previously Fixed: GHSA-q4gf-8mx6-v5v3 (High)
- **Package:** next
- **Vulnerability:** Next.js Denial of Service with Server Components
- **CVSS:** 7.5 (AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H)
- **Fix applied in:** d8388a4 — next.js 16.2.1 → 16.2.3

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\`; regex enforces `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` (HMAC-SHA256 signed HttpOnly session cookie with expiry)
3. Webhook Signatures: PASS — Square webhook verifies HMAC-SHA256 with constant-time comparison (fail-closed when key missing); Momence webhook also fails closed
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; items capped at 50; string lengths truncated; pickup time validated
5. Security Headers: PASS — HSTS (63072000s, includeSubDomains, preload), CSP, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy all present; poweredByHeader disabled
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; only specific trusted domains (squarecdn.com, euforyc.co.uk, momence.com, localhost)
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, components/
8. No localStorage Credentials: PASS — No `localStorage` usage found; auth uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — All API responses use generic error messages; `error.details` only exposed when `NODE_ENV=development`
10. Safe Health Checks: PASS — All health endpoints return only `{ status: 'ok' }` with no tokens or config

## Fixes Applied
- `d8388a4` — fix(security): upgrade next.js 16.2.1→16.2.3 to patch DoS vulnerability (GHSA-q4gf-8mx6-v5v3) — applied in prior scan run

## Manual Action Required
- None — all vulnerabilities resolved
