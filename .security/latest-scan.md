# Security Scan Report

**Date:** 2026-11-22 00:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()`, return 401 on failure
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; returns 500 when key is missing (fail-closed)
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; state transitions checked against whitelist
5. Security Headers: PASS — HSTS (63072000s, includeSubDomains, preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all present; `poweredByHeader: false`
6. Image Hostnames: PASS — Custom loader used, no `hostname: '**'` wildcard, no `remotePatterns` configured
7. No Hardcoded Secrets: PASS — No `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — No credential storage in localStorage; auth uses HttpOnly secure cookies
9. No Error Leaks: PASS — All API routes return generic error messages to clients; Momence routes gate `details` on `NODE_ENV === 'development'`; enquiry route logs error details server-side only
10. Safe Health Checks: PASS — No health/status endpoints expose tokens or internal configuration

## Fixes Applied
- None needed

## Manual Action Required
- None
