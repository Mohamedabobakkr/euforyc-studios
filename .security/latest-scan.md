# Security Scan Report

**Date:** 2026-04-07 12:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 2, fixed)
- Medium: 0
- Low: 0

### Fixed
- **lodash 4.17.23** (2 high-severity advisories):
  - GHSA-r5fr-rjxr-66jc: Code Injection via `_.template` imports key names (CVSS 8.1)
  - GHSA-f23m-r3pf-42rh: Prototype Pollution via `_.unset` and `_.omit` (CVSS 6.5)
- **recharts** depended on vulnerable lodash
- Both packages were unused in the codebase — removed entirely along with `components/ui/chart.tsx`

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both validate via `authenticateBarista()` HttpOnly cookie
3. Webhook Signatures: PASS — Square webhook fails closed (500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing; Momence webhook fails closed when `MOMENCE_WEBHOOK_SECRET` missing; both use constant-time comparison
4. Input Validation: PASS — `orderId` and `fulfillmentUid` validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps item count, quantity, and string lengths
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — only specific trusted domains listed (squarecdn.com, S3, euforyc.co.uk, momence.com, localhost)
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or inline passwords found in app/lib/components
8. No localStorage Credentials: PASS — no credential storage in localStorage detected
9. No Error Leaks: PASS — all API routes return generic error messages; MomenceApiError `details` field gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — health endpoints return only `{ status: 'ok' }`

## Fixes Applied
- `d128f32` — fix(security): remove unused lodash (CVE high) and recharts dependencies

## Manual Action Required
- None
