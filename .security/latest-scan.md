# Security Scan Report

**Date:** 2026-04-12 03:45 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1 — fixed)
- Medium: 0
- Low: 0

### Fixed: GHSA-q4gf-8mx6-v5v3 (High)
- **Package:** next
- **Vulnerability:** Next.js Denial of Service with Server Components
- **CVSS:** 7.5 (AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H)
- **Affected range:** 16.0.0-beta.0 — 16.2.2
- **Installed:** 16.2.1 → **Upgraded to 16.2.3**

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\`; regex validates safe chars
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` (HttpOnly session cookie)
3. Webhook Signatures: PASS — Square webhook verifies HMAC-SHA256 (fail-closed); Momence webhook rejects when secret missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; items capped at 50; lengths truncated
5. Security Headers: PASS — HSTS (63072000s, includeSubDomains, preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all present
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; only specific trusted domains (squarecdn.com, euforyc.co.uk, momence.com, localhost)
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, components/
8. No localStorage Credentials: PASS — No `localStorage` usage found; auth uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — All API responses use generic error messages; `error.message` details only exposed in `NODE_ENV=development`
10. Safe Health Checks: PASS — Health endpoints return only `{ status: 'ok' }` with no tokens or config

## Fixes Applied
- `389a27b` — fix(security): upgrade next.js 16.2.1→16.2.3 to patch DoS vulnerability (GHSA-q4gf-8mx6-v5v3)

## Manual Action Required
- None — all vulnerabilities resolved
