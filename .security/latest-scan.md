# Security Scan Report

**Date:** 2026-10-31 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 13 (all minimatch <11.0.1, dev-only eslint toolchain — does not ship to production)
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — custom image loader with no remote patterns; no hostname wildcards
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous analytics UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only; dev-only `error.details` gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- `6ed66ae` fix(security): update transitive dependencies via npm audit fix

## Manual Action Required
- 13 moderate minimatch vulnerabilities remain in eslint/typescript-eslint dev toolchain. These are dev-only dependencies (not shipped to production). The only available fix requires downgrading eslint from v10 to v4 (semver-major breaking change), which is not viable. Monitor for eslint-config-next and eslint updates that adopt minimatch >=11.0.1.
