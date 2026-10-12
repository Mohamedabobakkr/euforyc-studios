# Security Scan Report

**Date:** 2026-10-12 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7 (unchanged — all build-time only, no upstream fix available)
- Moderate: 0
- Low: 0

### Remaining Vulnerabilities (all build-time only)
7 high vulnerabilities all trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested glob patterns). No patched version of braces exists (3.0.3 is the latest release). Affected dependency chains:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `fast-glob@3.3.3` → `micromatch` → `braces`
- `eslint-config-next@16.4.0` → `@next/eslint-plugin-next@16.4.0` → `fast-glob@3.3.1` → `micromatch` → `braces`

**Risk assessment:** LOW — these are build-time dependencies only (CSS compilation and linting). The braces vulnerability requires processing specially crafted glob patterns during `npm run build` or `npx tailwindcss`, never at runtime on the production server. No user input reaches these code paths. Upgrading tailwindcss to v4.x would resolve all 7, but it is a major breaking change requiring a planned migration.

### Resolved Since Last Scan
- postcss-selector-parser moderate vulnerabilities: no longer flagged (resolved by dependency updates)

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict allowlist regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — orders and update-order routes validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`; rate-limited to 5 attempts per 15 min
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (HTTP 500) when key missing; constant-time comparison prevents timing attacks
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; catalog IDs truncated to 100 chars
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — only `euforyc_uid` (anonymous analytics UUID via `crypto.randomUUID()`) stored client-side; barista sessions use HttpOnly cookies exclusively
9. No Error Leaks: PASS — API routes return generic messages; detailed errors logged server-side only; dev-only `error.details` in Momence routes gated by `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health/status endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed this scan — no new actionable vulnerabilities found

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 7 remaining high vulnerabilities. Major breaking change (config format changes from JS to CSS-based). Recommend scheduling as a planned migration sprint. Runtime risk is LOW since these are build-time-only dependencies with no production exposure.
