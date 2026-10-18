# Security Scan Report

**Date:** 2026-10-18 03:15 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7 (all `braces@3.0.3` — build-time only, no patched version exists)
- Medium: 0
- Low: 0

### Details
All 7 HIGH findings trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested glob patterns). Affected dependency chains:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `fast-glob@3.3.3` → `micromatch` → `braces`
- `eslint-config-next@16.x` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`

**Risk assessment:** LOW — these are build-time dependencies only (CSS compilation and linting). The braces vulnerability requires processing specially crafted glob patterns during `npm run build` or `npx tailwindcss`, never at runtime on the production server. No user input reaches these code paths. No patched version of braces exists (3.0.3 is the latest release).

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict allowlist regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order enforces length limits and item caps
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; only anonymous analytics UUID stored client-side
9. No Error Leaks: PASS — API routes return generic messages; `error.details` only exposed when `NODE_ENV === 'development'`; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed — all 10 code security checks pass; npm vulnerabilities are build-time only with no safe auto-fix path

## Manual Action Required
- **braces@3.0.3**: Monitor for a patch release from the braces maintainer (github.com/micromatch/braces). Once available, add `"braces": ">=3.0.4"` to package.json overrides. Alternatively, evaluate tailwindcss v4 migration when convenient — this is not urgent as the vulnerability is build-time only with no production exposure.
