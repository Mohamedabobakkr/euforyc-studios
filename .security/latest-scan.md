# Security Scan Report

**Date:** 2026-09-12 11:26 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, and enforces safe character regex
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (returns 500) when key missing
4. Input Validation: PASS — orderId and fulfillmentUid validated against /^[a-zA-Z0-9_-]+$/ regex; state transitions whitelist-checked
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — remotePatterns uses explicit hostnames (squarecdn.com, euforyc.co.uk, momence.com, localhost), no wildcard `**`
7. No Hardcoded Secrets: PASS — grep for sk-, pk_live, hardcoded passwords found no matches
8. No localStorage Credentials: PASS — no localStorage usage for passwords, tokens, secrets, or credentials
9. No Error Leaks: PASS — API routes return generic error messages ("Failed to fetch orders", "Failed to update order"), no stack traces or error details exposed
10. Safe Health Checks: PASS — no health check endpoints exist; no risk of token/config exposure

## Fixes Applied
- None needed — all dependencies already patched on prior scan (next@16.3.4, sharp@0.35.4)

## Manual Action Required
- None
