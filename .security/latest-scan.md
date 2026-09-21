# Security Scan Report

**Date:** 2026-09-21 06:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both validate barista session via HttpOnly cookie (`authenticateBarista()`)
3. Webhook Signatures: PASS — Fails closed when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing (returns 500); HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; customer names, notes, quantities all sanitized and length-limited
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured; `poweredByHeader: false`
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; only specific trusted domains in `remotePatterns`
7. No Hardcoded Secrets: PASS — No `sk-`, `sk_live`, `pk_live`, or hardcoded passwords found in source
8. No localStorage Credentials: PASS — No credentials stored in localStorage; session uses HttpOnly cookies
9. No Error Leaks: PASS — All API routes return generic error messages; `error.details` exposed only in development mode
10. Safe Health Checks: PASS — No health check endpoints that expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
