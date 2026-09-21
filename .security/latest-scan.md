# Security Scan Report

**Date:** 2026-09-21 19:26 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, and enforces safe character allowlist
2. API Auth: PASS — both orders and update-order routes call authenticateBarista() via HttpOnly cookie with HMAC-SHA256 session tokens
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed when key missing (returns 500)
4. Input Validation: PASS — orderId and fulfillmentUid validated against `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — no wildcard `**` hostname; only specific trusted domains listed
7. No Hardcoded Secrets: PASS — all secrets read from environment variables (BARISTA_PASSWORD, SQUARE_ACCESS_TOKEN, etc.)
8. No localStorage Credentials: PASS — only non-sensitive analytics UID stored; no credential storage
9. No Error Leaks: PASS — all API routes return generic error messages; no stack traces or error details exposed
10. Safe Health Checks: PASS — no dedicated health endpoint; API routes don't expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
