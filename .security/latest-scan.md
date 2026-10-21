# Security Scan Report

**Date:** 2026-10-21 09:15 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 7 (all build-time transitive deps, no runtime exposure)
- Medium: 0
- Low: 0

### Details
All 7 HIGH findings trace to build-time dependencies (CSS compilation and linting), not runtime code:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3` (stack-exhaustion DoS via nested patterns, GHSA-vfj7-8cjw-p6xm)
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.4.2` → `@next/eslint-plugin-next@16.4.2` → `fast-glob@3.3.1` → `micromatch` → `braces`

**Risk assessment:** LOW — these packages process CSS and lint rules at build time only. They never execute in the production Node.js runtime or browser. No patched minor/patch versions exist for any of these chains.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order enforces length limits and item caps
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only; Momence route conditionally exposes details only in development mode
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- `90e98f1` — bump eslint-config-next 16.4.1 → 16.4.2 (housekeeping, keeps linting toolchain current)

## Manual Action Required
- **tailwindcss v3→v4 migration**: Would resolve 5 of 7 vulnerabilities (braces, micromatch, chokidar, tailwindcss, fast-glob partial). Significant migration with breaking changes — recommend scheduling as a dedicated task.
- **@next/eslint-plugin-next fast-glob**: Latest version still depends on vulnerable fast-glob/micromatch/braces. Monitor for a patch release from the Next.js team.
- **Build environment**: `npm run build` fails due to missing `MOMENCE_API_TOKEN` in CI — this is an environment config issue, not a code vulnerability.
