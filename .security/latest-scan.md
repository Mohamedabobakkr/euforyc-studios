# Security Scan Report

**Date:** 2026-07-23 14:22 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — orders/route.ts and update-order/route.ts both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — rejects with 500 when SQUARE_WEBHOOK_SIGNATURE_KEY missing (fail-closed), HMAC-SHA256 verified with constant-time comparison
4. Input Validation: PASS — orderId and fulfillmentUid validated against /^[a-zA-Z0-9_-]+$/, state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr+preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no wildcard `**` hostname, restricted to squarecdn.com, S3 bucket, euforyc.co.uk, momence.com, localhost
7. No Hardcoded Secrets: PASS — all secrets from env vars, no sk-/pk_live/AKIA patterns found
8. No localStorage Credentials: PASS — only stores anonymous visitor ID (euforyc_uid), no tokens or passwords
9. No Error Leaks: PASS — all API routes return generic error messages, no details/stack exposed
10. Safe Health Checks: PASS — no health check endpoints exist (N/A)

## Fixes Applied
- None needed — all vulnerabilities from previous scan (sharp, next, brace-expansion) already resolved in commit 330c7d5

## Manual Action Required
- Build currently fails due to Momence API being unavailable (503 Service Temporarily Unavailable) — this is a pre-existing external service issue unrelated to security. Consider adding error boundaries or fallback behavior for the /api/momence routes.
