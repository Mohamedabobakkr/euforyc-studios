# Security Scan Report

**Date:** 2026-11-14 06:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe character whitelist
2. API Auth: PASS — both `/api/sips/orders` and `/api/sips/update-order` verify barista session via `authenticateBarista()` HttpOnly cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verification with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — order IDs validated with `safeIdPattern`, state transitions whitelisted, input lengths capped, items limited to 50
5. Security Headers: PASS — HSTS (2yr preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no wildcard hostname; uses custom image loader with pre-sized static files
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, `sk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — localStorage used only for `euforyc_uid` (anonymous analytics ID), not credentials
9. No Error Leaks: PASS — Momence routes gate `error.details` behind `NODE_ENV === 'development'`; all other routes return generic messages
10. Safe Health Checks: PASS — no health endpoints; API routes do not expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
