# Security Scan Report

**Date:** 2026-10-23 03:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7 (all build-time transitive deps, no runtime exposure)
- Medium: 0
- Low: 0

All 7 HIGH findings trace to a single root cause: `braces` <=3.0.3 (GHSA-vfj7-8cjw-p6xm, stack-exhaustion DoS via deeply nested patterns). The vulnerable `braces` is pulled in transitively by build-time dependencies only:
- `tailwindcss@3.4.19` -> `chokidar@3.6.0` / `micromatch@4.0.8` / `fast-glob` -> `braces@3.0.3`
- `eslint-config-next@16.4.2` -> `@next/eslint-plugin-next` -> `fast-glob@3.3.1` -> `micromatch` -> `braces`

**Risk assessment:** LOW — these packages process CSS and lint rules at build time only. They never execute in the production Node.js runtime or browser. No patch exists in the braces 3.x line (3.0.3 is the latest).

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous tracking UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only; Momence `details` field gated behind `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- **braces <=3.0.3 (7 high):** All 7 npm audit findings share this root cause. Resolving requires migrating tailwindcss from v3 to v4 (breaking: config format, utility classes, plugin API) and/or waiting for eslint-config-next to ship a version that drops the transitive braces dependency. Both are build-time only — no production runtime exposure.
