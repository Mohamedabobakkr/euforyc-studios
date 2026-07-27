# Security Scan Report

**Date:** 2026-07-27 11:25 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 9, fixed by brace-expansion override to ^5.0.8)
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS - validateSquarePath() blocks `..`, `//`, `\\`; enforces strict regex on path portion
2. API Auth: PASS - orders and update-order routes call authenticateBarista() via HttpOnly session cookies; constant-time password comparison
3. Webhook Signatures: PASS - HMAC-SHA256 verified with constant-time comparison; fails closed with 500 when key missing
4. Input Validation: PASS - orderId/fulfillmentUid validated with /^[a-zA-Z0-9_-]+$/; state transitions whitelisted
5. Security Headers: PASS - HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set; poweredByHeader: false
6. Image Hostnames: PASS - remotePatterns restricted to specific trusted domains only; no hostname: '**' wildcard
7. No Hardcoded Secrets: PASS - no sk-, pk_live, or hardcoded passwords found in source; all secrets from process.env
8. No localStorage Credentials: PASS - auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS - all API routes return generic error messages; no details/stack traces exposed to clients
10. Safe Health Checks: PASS - no health check endpoints expose tokens or internal config

## Fixes Applied
- Bumped brace-expansion override from >=4.0.1 to ^5.0.8 for complete GHSA-mh99-v99m-4gvg remediation

## Manual Action Required
- None

## Notes
- Build verification: TypeScript compilation succeeds. Full build fails at page-data collection due to missing MOMENCE_API_TOKEN in this CI environment — pre-existing configuration issue, not a code defect.
- CSP includes `unsafe-inline` and `unsafe-eval` in script-src — acceptable for Next.js SSR but worth reviewing if inline scripts can be moved to nonces in future.
