# Security Scan Report

**Date:** 2026-10-22 21:00 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0 (was 1 — fixed this scan)
- High: 7 (all build-time transitive deps, no runtime exposure)
- Medium: 0
- Low: 0

### Critical Fix Applied
Upgraded `next` from 16.3.8 to 16.4.2, patching three CVEs in Next.js 16.0.0–16.4.0:
- **GHSA-2464-fhr4-w9xw** (Critical): Unauthenticated RCE in Image Optimization API via SVG files
- **GHSA-p3m5-59mp-jv5r** (High): Denial of Service in App Router Server Actions
- **GHSA-673q-mjm6-r5xr** (Critical): Unauthenticated RCE in `use cache` functions returning typed arrays

### Remaining High (build-time only)
All 7 HIGH findings trace to a single root cause: `braces` <=3.0.3 (GHSA-vfj7-8cjw-p6xm, stack-exhaustion DoS via deeply nested patterns). The vulnerable `braces` is pulled in transitively by build-time dependencies only:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.4.2` → `@next/eslint-plugin-next@16.4.2` → `fast-glob` → `micromatch` → `braces`

**Risk assessment:** LOW — these packages process CSS and lint rules at build time only. They never execute in the production Node.js runtime or browser.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous tracking UID
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- `a02fc6d` fix(security): upgrade next 16.3.8 → 16.4.2 — patches 3 critical/high CVEs (RCE via SVG, DoS in Server Actions, RCE in use cache)

## Manual Action Required
- **braces <=3.0.3 (7 high):** All 7 npm audit findings share this root cause. Resolving requires migrating tailwindcss from v3 to v4 (breaking: config format, utility classes, plugin API) and/or waiting for eslint-config-next to ship a version that drops the transitive braces dependency. Both are build-time only — no production runtime exposure.
- **Build verification:** `npm run build` fails in this CI environment due to missing `MOMENCE_API_TOKEN` (pre-existing, unrelated to security). TypeScript type-check passes cleanly. Production builds on Vercel with env vars configured are unaffected.
