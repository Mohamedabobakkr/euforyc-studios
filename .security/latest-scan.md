# Security Scan Report

**Date:** 2026-10-03 11:26 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7
- Medium: 0
- Low: 0

All 7 high-severity findings are in dev/build-time dependencies (braces, micromatch, fast-glob, chokidar) pulled in by tailwindcss@3.4.19 and eslint-config-next@16.3.8. They are NOT exploitable at runtime — they affect CSS tooling and linting only. Fixes require major version upgrades (tailwindcss 3→4, eslint-config-next restructuring) which carry breaking-change risk and should be planned manually.

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\` and enforces strict path regex
2. API Auth: PASS — both orders and update-order routes use authenticateBarista() with HttpOnly HMAC-SHA256 session cookies
3. Webhook Signatures: PASS — fails closed (500) when SQUARE_WEBHOOK_SIGNATURE_KEY missing; uses HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId and fulfillmentUid validated against /^[a-zA-Z0-9_-]+$/ regex
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — no wildcard hostname; only specific trusted domains listed
7. No Hardcoded Secrets: PASS — no sk-, pk_live, or hardcoded credentials found in app/, lib/, components/
8. No localStorage Credentials: PASS — localStorage only stores euforyc_uid (anonymous tracking ID), not credentials
9. No Error Leaks: PASS — API routes return generic error messages; no stack traces or error details exposed
10. Safe Health Checks: PASS — no health/status endpoints exist that could leak configuration

## Fixes Applied
- None needed — all code security checks pass

## Manual Action Required
- **tailwindcss 3→4 migration**: Would resolve braces/micromatch/chokidar/fast-glob vulnerabilities (dev-only). This is a major version change requiring config file migration (tailwind.config.js → CSS-based config) and testing of all styled components.
- **eslint-config-next**: The @next/eslint-plugin-next dependency pulls in fast-glob@3.3.1 via micromatch. No non-breaking fix available in the current Next.js 16.x eslint toolchain. Monitor for a patch release.
