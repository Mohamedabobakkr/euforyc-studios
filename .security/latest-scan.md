# Security Scan Report

**Date:** 2026-10-16 08:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7 (all build-time only, no upstream fix available without major version bump)
- Medium: 0
- Low: 0

All 7 high-severity findings trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested glob patterns). braces 3.0.3 is the latest release; no upstream fix exists. Affected dependency chains:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `fast-glob@3.3.3` → `micromatch` → `braces`
- `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`

**Risk assessment:** LOW — these are build-time dependencies only (CSS compilation and linting). The braces vulnerability requires processing specially crafted glob patterns during `npm run build` or `npx tailwindcss`, never at runtime on the production server. No user input reaches these code paths. No patched version of braces exists (3.0.3 is the latest release).

Fix paths considered:
- `tailwindcss` v3 → v4: major breaking change (complete config/syntax rewrite) — not safe for automated fix
- `eslint-config-next`: npm suggests downgrade to 14.2.35, incompatible with Next.js 16 — not applicable
- `npm audit fix`: no non-breaking fix available
- `npm audit fix --force`: policy prohibits; would break the build

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict allowlist regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — orders and update-order routes validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (HTTP 500) when key missing; constant-time comparison prevents timing attacks
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; order items capped at 50; quantities capped at 99; Zod schema on enquiry form
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; only anonymous analytics UUID (`euforyc_uid`) stored client-side
9. No Error Leaks: PASS — API routes return generic messages; Momence `details` gated by `NODE_ENV === 'development'`; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None needed — all code security checks pass; npm vulnerabilities have no upstream fix

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve 5 of 7 remaining high vulnerabilities. Major breaking change (config format changes from JS to CSS-based). Recommend scheduling as a planned migration sprint. Runtime risk is LOW since these are build-time-only dependencies with no production exposure.
- **braces upstream fix:** Monitor for a patched release of `braces` (>3.0.3). When available, add `"braces": "^3.0.4"` to overrides in package.json to resolve all 7 findings without breaking changes.
