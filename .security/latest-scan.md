# Security Scan Report

**Date:** 2026-11-02 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

Previous minimatch override (^10.2.6) was updated to ^11.0.1 in an earlier scan today, resolving all 13 moderate findings (GHSA-g3hv-75wg-m249). Current scan confirms 0 vulnerabilities.

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and validates with strict regex
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HMAC-signed HttpOnly session cookies
3. Webhook Signatures: PASS — SQUARE_WEBHOOK_SIGNATURE_KEY checked at entry; missing key returns 500 (fail-closed); HMAC-SHA256 verified with constant-time comparison
4. Input Validation: PASS — orderId and fulfillmentUid validated with /^[a-zA-Z0-9_-]+$/, state transitions whitelist-checked, item quantities capped
5. Security Headers: PASS — HSTS (2 years + preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — custom image loader used, no remote patterns or hostname wildcards
7. No Hardcoded Secrets: PASS — grep for sk-, pk_live, hardcoded passwords found nothing in app/lib/components
8. No localStorage Credentials: PASS — no credential storage in localStorage detected
9. No Error Leaks: PASS — API responses return generic messages; Momence error details gated behind NODE_ENV==='development'; enquiry route error.message only in server-side logs
10. Safe Health Checks: PASS — no health endpoints expose tokens or internal config

## Fixes Applied
- None needed (minimatch override already fixed by earlier scan: commit 6a0f2e9)

## Manual Action Required
- None
