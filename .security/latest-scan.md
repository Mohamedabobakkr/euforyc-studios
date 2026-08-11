# Security Scan Report

**Date:** 2026-08-11 07:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, and enforces safe-character regex
2. API Auth: PASS — both orders and update-order routes use authenticateBarista() with HttpOnly session cookies
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed when key is missing (returns 500)
4. Input Validation: PASS — orderId and fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — remotePatterns scoped to specific trusted domains, no `**` wildcard
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no sensitive data stored in localStorage
9. No Error Leaks: PASS — API routes return generic messages; client-side err.message usage is UI-only, not API responses
10. Safe Health Checks: PASS — no health check endpoints exposing tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
