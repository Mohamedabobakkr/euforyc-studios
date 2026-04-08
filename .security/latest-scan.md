# Security Scan Report

**Date:** 2026-04-08 11:45 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1 — lodash Code Injection CVE fixed)
- Medium: 0 (was 1 — lodash Prototype Pollution CVE fixed)
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe char regex
2. API Auth: PASS — orders and update-order routes use authenticateBarista() HttpOnly cookie auth
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time compare; Momence webhook fails closed when secret missing
4. Input Validation: PASS — order IDs validated with `/^[a-zA-Z0-9_-]+$/`, inputs sanitized and length-capped
5. Security Headers: PASS — HSTS (63072000s + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no wildcard `**` hostname; restricted to squarecdn.com, momence.com, own domains, specific S3 bucket
7. No Hardcoded Secrets: PASS — no sk-, pk_live, sk_live, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no localStorage.setItem or getItem calls found
9. No Error Leaks: PASS (was FAIL — fixed; see below)
10. Safe Health Checks: PASS — GET endpoints on track-event, track-purchase, webhooks/momence return only `{ status: 'ok' }`

## Fixes Applied
- `7a47af6` fix(security): patch lodash CVE and suppress error message leaks
  - Updated lodash override from 4.17.23 to 4.18.1 in package.json (resolves GHSA-r5fr-rjxr-66jc Code Injection and GHSA-f23m-r3pf-42rh Prototype Pollution)
  - Replaced `error.message` with generic endpoint-specific messages in 4 Momence API routes (events, teachers, products, memberships) to prevent upstream API error details from leaking to clients

## Manual Action Required
- None
