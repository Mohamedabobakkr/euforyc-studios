# Security Scan Report

**Date:** 2026-11-05 03:28 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

569 packages audited, 0 vulnerabilities found.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe-character regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — both `/api/sips/orders` and `/api/sips/update-order` call `authenticateBarista()` (HMAC-SHA256 signed HttpOnly cookie)
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS — order IDs validated with `^[a-zA-Z0-9_-]+$`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set; X-Powered-By disabled
6. Image Hostnames: PASS — custom image loader; no remote patterns or `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, components/
8. No localStorage Credentials: PASS — localStorage stores only anonymous analytics UID (`euforyc_uid`); barista auth uses HttpOnly cookies exclusively
9. No Error Leaks: PASS — all API routes return generic error messages; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed — minimatch override ^11.0.1 (GHSA-g3hv-75wg-m249) was already applied from prior scan

## Manual Action Required
- None
