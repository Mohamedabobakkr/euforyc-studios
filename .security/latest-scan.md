# Security Scan Report

**Date:** 2026-10-24 11:25 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

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
- `e7c80f6` fix(security): upgrade zod 3.23.8 → 4.6.7 (applied in prior scan, already on main)

## Manual Action Required
- `npm run build` fails due to missing MOMENCE_API_TOKEN env var — pre-existing issue in /api/momence/events route, not a security vulnerability but worth configuring for production builds
