# Security Scan Report

**Date:** 2026-10-06 19:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7
- Medium: 2
- Low: 0

### Fixed This Scan
- **source-map-js** 1.2.1 → 1.2.2 (high) — GHSA-68fv-2mgg-jv7q: event-loop DoS through indexed source-map section offsets
- **sharp** 0.35.4 → 0.35.5 (high) — CVE-2026-96889 / GHSA-wq5f-xc86-pv6w: librsvg use-after-free vulnerability

### Remaining (require major version upgrades)
All remaining vulnerabilities trace to two dependency trees:

**tailwindcss@3.4.19** (7 vulns — build-time only):
- `braces@3.0.3` (high) — stack-exhaustion DoS via deeply nested glob patterns
- `chokidar@3.6.0` → braces (high)
- `micromatch@4.0.8` → braces (high)
- `fast-glob` → micromatch (high)
- `postcss-selector-parser` <7.1.6 (moderate) — quadratic complexity DoS
- `postcss-nested` 6.2.0 → postcss-selector-parser (moderate)

**eslint-config-next@16.3.8** (dev-time only):
- `@next/eslint-plugin-next` → fast-glob → micromatch → braces (high)

**Risk assessment:** LOW — these are build/dev-time dependencies only. The braces vulnerability requires processing specially crafted glob patterns during `npm run build` / `npx tailwindcss`, never at runtime on the production server.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict allowlist regex
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/, lib/, or components/
8. No localStorage Credentials: PASS — no credentials stored client-side
9. No Error Leaks: PASS — API routes return generic messages; internal error details logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- `4a5d6a7` fix(security): override source-map-js to 1.2.2 and sharp to 0.35.5

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve 7 of 9 remaining vulnerabilities. Major version upgrade with breaking changes to configuration format. Recommend scheduling as a planned migration sprint. Runtime risk is LOW since these are build-time-only dependencies.
- **eslint-config-next:** 3 vulnerabilities chain through braces (no patched version in the v3 braces line). npm audit suggests downgrading to 14.2.35, which is incompatible with Next.js 16. Will resolve automatically when braces publishes 3.0.4+.
