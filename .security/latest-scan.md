# Security Scan Report

**Date:** 2026-09-10 19:27 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — Both orders and update-order routes call authenticateBarista() with HMAC-SHA256 signed session tokens
3. Webhook Signatures: PASS — Fails closed with 500 when SQUARE_WEBHOOK_SIGNATURE_KEY is missing; uses constant-time comparison
4. Input Validation: PASS — Order IDs and fulfillment UIDs validated against `^[a-zA-Z0-9_-]+$`; state transitions use whitelist
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all present; poweredByHeader disabled
6. Image Hostnames: PASS — Only specific trusted domains (squarecdn.com, S3, euforyc.co.uk, momence.com, localhost)
7. No Hardcoded Secrets: PASS — All sensitive values read from process.env
8. No localStorage Credentials: PASS — Barista session uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — Generic error messages returned; details only exposed in development mode
10. Safe Health Checks: PASS — No health/status endpoints exist

## Fixes Applied
- None needed — all dependencies are up to date and all code checks pass

## Manual Action Required
- None

## Advisory Notes
- CSP includes `unsafe-inline` and `unsafe-eval` for scripts (common with Next.js but worth reviewing if dependencies allow removal)
- In-memory rate limiting and webhook dedup caches reset on restart and don't work across replicas; consider Redis at scale
