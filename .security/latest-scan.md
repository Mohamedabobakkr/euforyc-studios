# Security Scan Report

**Date:** 2026-04-04 19:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1 — lodash, now fixed)
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\`; regex allows only safe chars
2. API Auth: PASS — /api/sips/orders and /api/sips/update-order both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time compare; Momence webhook uses crypto.timingSafeEqual; both fail closed when keys missing
4. Input Validation: PASS — orderId and fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — no wildcard `**`; restricted to squarecdn.com, euforyc.co.uk, momence.com, S3, localhost
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no credential storage in localStorage
9. No Error Leaks: PASS — MomenceApiError uses generic messages; error.details gated behind NODE_ENV=development; Square/Sips routes return static error strings
10. Safe Health Checks: PASS — Momence webhook GET returns only `{ status: 'ok' }`

## Fixes Applied
- `fff4b14` — fix(security): remove unused recharts/stripe to eliminate lodash vulnerability
  - Removed `recharts` (unused dep, sole consumer of vulnerable lodash 4.17.23)
  - Removed `stripe` (listed but never imported)
  - Removed `lodash` override pinning v4.17.23
  - Deleted orphaned `components/ui/chart.tsx`
  - Resolved: GHSA-r5fr-rjxr-66jc (lodash code injection via _.template, HIGH/CVSS 8.1)
  - Resolved: GHSA-f23m-r3pf-42rh (lodash prototype pollution via _.unset/_.omit, MODERATE/CVSS 6.5)

## Manual Action Required
- None
