# Security Scan Report

**Date:** 2026-04-09 12:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

Previously found 2 high severity vulnerabilities (lodash@4.17.23 via recharts@2.15.4):
- GHSA-r5fr-rjxr-66jc — lodash Code Injection via `_.template` (CVSS 8.1)
- GHSA-f23m-r3pf-42rh — lodash Prototype Pollution via `_.unset`/`_.omit` (CVSS 6.5)

**Resolution:** `recharts` and its wrapper `components/ui/chart.tsx` were never imported anywhere in the codebase. Both were removed entirely — zero functional impact, eliminates all npm vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in lib/square.ts blocks `..`, `//`, `\\` and enforces strict alphanumeric regex
2. API Auth: PASS — Both orders/route.ts and update-order/route.ts call `authenticateBarista()` before processing
3. Webhook Signatures: PASS — Square uses HMAC-SHA256 with constant-time comparison; Momence uses `crypto.timingSafeEqual()`; both fail closed when keys missing
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; state transitions checked against whitelist
5. Security Headers: PASS — HSTS (2yr+preload), X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — Only whitelisted domains (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — All tokens/keys use environment variables; no sk-, pk_live, or plaintext passwords in source
8. No localStorage Credentials: PASS — Auth uses HttpOnly+Secure+SameSite cookies exclusively; no localStorage usage found
9. No Error Leaks: PASS — All error detail exposure is gated behind `process.env.NODE_ENV === 'development'`; production returns generic messages
10. Safe Health Checks: PASS — GET endpoints return only `{ status: 'ok' }` with no internal config exposed

## Fixes Applied
- Removed unused `recharts@2.15.4` dependency (eliminated vulnerable `lodash@4.17.23`)
- Deleted unused `components/ui/chart.tsx` wrapper component

## Manual Action Required
- None
