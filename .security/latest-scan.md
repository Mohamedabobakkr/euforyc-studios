# Security Scan Report

**Date:** 2026-10-24 07:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 1 — fixed)
- Medium: 0
- Low: 0

### Vulnerability fixed
- **zod <4.6.6** (GHSA-mrhx-c7xc-m3w5): Memory exhaustion while validating oversized constrained collections (CVSS 7.5 HIGH). Upgraded from 3.23.8 to 4.6.7. Build and type-check verified clean.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` in lib/square.ts blocks `..`, `//`, `\\` and validates path format with strict regex
2. API Auth: PASS — both orders/route.ts and update-order/route.ts check `authenticateBarista()` via HttpOnly cookie
3. Webhook Signatures: PASS — fails closed (returns 500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` is missing; HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions validated against allowlist
5. Security Headers: PASS — HSTS (2yr+preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no wildcard `hostname: '**'`; only trusted domains in remotePatterns
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no credential storage in localStorage
9. No Error Leaks: PASS — all API routes return generic error messages; internal details logged server-side only
10. Safe Health Checks: PASS — no health check endpoints exist that could expose config

## Fixes Applied
- `e7c80f6` fix(security): upgrade zod 3.23.8 → 4.6.7 to fix memory exhaustion vulnerability

## Manual Action Required
- None
