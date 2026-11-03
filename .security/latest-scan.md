# Security Scan Report

**Date:** 2026-11-03 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 13
- Low: 0

All 13 moderate vulnerabilities trace to a single root cause: `minimatch <11.0.1` (ReDoS via globparts amplification) pulled in by the eslint toolchain (`eslint`, `eslint-config-next`, `typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`). These are linting/dev-only packages — they never run in production. The suggested fix requires a semver-major upgrade of `eslint` (to 4.0.0) and `eslint-config-next` (to 0.2.4, a downgrade from 16.4.2), which would break the linting configuration. No action taken; risk is negligible for a production site.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs; redirect URLs checked against allowlist
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — custom image loader with no remote hostname config; no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous analytics UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients (`'Failed to fetch orders'`, `'Failed to update order'`, `'Enquiry could not be delivered'`); detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- **Low priority:** When the Next.js/eslint ecosystem releases compatible versions, upgrade `eslint` and `eslint-config-next` to resolve the 13 moderate `minimatch` ReDoS advisories. These affect dev tooling only, not production.
