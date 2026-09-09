# Security Scan Report

**Date:** 2026-09-09 08:15 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0 (was 1 — fixed)
- High: 0 (was 1 — fixed)
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
9. No Error Leaks: PASS — Error details gated behind NODE_ENV=development check; generic messages in production
10. Safe Health Checks: PASS — No health/status endpoints exist that could expose tokens

## Fixes Applied
- `6f159b4` fix(security): upgrade next to 16.3.4 and sharp to 0.35.4
  - next 16.3.0 → 16.3.4: fixes GHSA-p293-qw3h-jr36 (critical, unauthenticated RCE on Windows) and GHSA-2xp9-vwfh-vxw4 (critical, RCE via AVIF in Image Optimization API)
  - sharp 0.35.3 → 0.35.4 (override): fixes GHSA-rgj7-g3m4-5g8c (high, heap buffer overflow in libheif)

## Manual Action Required
- None

## Advisory Notes
- CSP includes `unsafe-inline` and `unsafe-eval` for scripts (common with Next.js but worth reviewing if dependencies allow removal)
- In-memory rate limiting and webhook dedup caches reset on restart and don't work across replicas; consider Redis at scale
