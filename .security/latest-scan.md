# Security Scan Report

**Date:** 2026-11-05 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 13
- Low: 0

All 13 moderate vulnerabilities are in `minimatch` (ReDoS via glob pattern amplification, GHSA-g3hv-75wg-m249), a transitive dependency of `eslint`, `eslint-config-next`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, and `@typescript-eslint/*`. These are lint/build-time tools with no production runtime exposure. Fix requires a semver-major upgrade of `eslint` (v10 -> v11+) and `eslint-config-next` (v16 -> latest); not auto-fixable without risk.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — uses custom image loader with no remote patterns; no wildcard hostname
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous analytics UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only; dev-only `error.details` gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- Consider upgrading `eslint` (^10.8.0 -> ^11.x) and `eslint-config-next` (^16.4.2 -> latest compatible) to resolve 13 moderate `minimatch` ReDoS vulnerabilities. These only affect build/lint tooling, not the production runtime.
