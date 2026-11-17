# Security Scan Report

**Date:** 2026-11-17 12:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and validates safe character pattern
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HMAC-SHA256 signed HttpOnly cookie
3. Webhook Signatures: PASS — verifies HMAC-SHA256 signature, fails closed (500) when key missing, rejects invalid (403)
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`, items capped, quantities bounded
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, poweredByHeader disabled
6. Image Hostnames: PASS — no `hostname: '**'` wildcard; uses custom image loader
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords found in app/, lib/, components/
8. No localStorage Credentials: PASS — localStorage stores only euforyc_uid (random analytics ID); auth uses HttpOnly cookies
9. No Error Leaks: PASS — API routes return generic messages; Momence details only in development mode
10. Safe Health Checks: PASS — no health endpoints exposing tokens; auth GET returns only { authenticated: boolean }

## Fixes Applied
- None needed (GHSA-mfr8-8qww-v76h fix already applied in previous scan)

## Manual Action Required
- None
