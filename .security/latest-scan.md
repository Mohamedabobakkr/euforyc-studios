# Security Scan Report

**Date:** 2026-09-16 09:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe character whitelist
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() with HttpOnly cookie validation
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; returns 500 when key missing (fail-closed)
4. Input Validation: PASS — Order IDs validated against `/^[a-zA-Z0-9_-]+$/`; inputs length-capped; quantities bounded 1-99
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns restricted to specific trusted domains (squarecdn.com, euforyc.co.uk, momence.com, S3); no wildcard `**`
7. No Hardcoded Secrets: PASS — All secrets sourced from environment variables; no sk-, pk_live_, or hardcoded passwords found
8. No localStorage Credentials: PASS — localStorage only stores `euforyc_uid` visitor tracking ID, no credentials or tokens
9. No Error Leaks: PASS — All API routes return generic error messages; error details only exposed in development mode
10. Safe Health Checks: PASS — No health check endpoints exist; no internal config or tokens exposed via any route

## Fixes Applied
- None needed

## Manual Action Required
- None
