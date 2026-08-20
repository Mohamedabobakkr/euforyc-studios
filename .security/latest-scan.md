# Security Scan Report

**Date:** 2026-08-20 19:24 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks ../, //, \\; enforces strict allowlist regex /^\/[a-zA-Z0-9/_-]+$/
2. API Auth: PASS — orders and update-order routes call authenticateBarista() with HMAC-SHA256 session tokens; rate-limited login; constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 with constant-time comparison; fails closed (500) when key missing; rejects invalid with 403
4. Input Validation: PASS — orderId/fulfillmentUid validated against /^[a-zA-Z0-9_-]+$/; state transitions whitelisted
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options all set; poweredByHeader disabled; API routes set Cache-Control: no-store
6. Image Hostnames: PASS — remotePatterns uses specific named hosts only, no ** wildcard
7. No Hardcoded Secrets: PASS — all secrets read from process.env at runtime; .env files gitignored
8. No localStorage Credentials: PASS — auth uses HttpOnly cookies exclusively; only random analytics ID in localStorage
9. No Error Leaks: PASS — generic messages in production; details only in dev mode via NODE_ENV guard
10. Safe Health Checks: PASS — no health-check endpoints exist; no routes expose env vars or config

## Fixes Applied
- None needed

## Manual Action Required
- None
