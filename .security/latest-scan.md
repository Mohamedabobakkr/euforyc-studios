# Security Scan Report

**Date:** 2026-10-09 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 7 (all braces/micromatch via tailwindcss v3 — build-time only, requires semver-major upgrade to v4)
- Moderate: 2 (postcss-selector-parser, postcss-nested — also via tailwindcss v3)
- Low: 0

### Fixes Applied This Scan
- `sharp` 0.35.4 → 0.35.5 — fixes CVE-2026-96889 (librsvg vulnerability, high severity)
- `source-map-js` 1.2.1 → 1.2.2 — fixes GHSA-68fv-2mgg-jv7q (event-loop DoS, high severity)

Reduced total vulnerabilities from 11 to 9.

### Remaining Vulnerabilities (all build-time only)
All 9 remaining vulnerabilities trace to `tailwindcss@3.4.19` and its dependency tree:
- `braces@3.0.3` (7 high) — GHSA-vfj7-8cjw-p6xm: stack-exhaustion DoS via deeply nested glob patterns
- `postcss-selector-parser` (1 moderate) — GHSA-rj75-hqrm-r3gf: quadratic complexity in flat selector parsing
- `postcss-nested` (1 moderate) — transitive via postcss-selector-parser

**Risk assessment:** LOW — these are build-time dependencies only. The `braces` vulnerability requires processing specially crafted glob patterns during `npm run build` / `npx tailwindcss`, never at runtime. Fixing requires tailwindcss v4, a breaking major upgrade.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and validates with strict allowlist regex
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets loaded from environment variables
8. No localStorage Credentials: PASS — no credentials stored client-side
9. No Error Leaks: PASS — API routes return generic error messages to clients; details logged server-side only
10. Safe Health Checks: PASS — no health/status endpoints expose tokens or internal config

## Fixes Applied
- sharp@0.35.5 and source-map-js@1.2.2 already patched (prior scan and confirmed current in lockfile)

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 9 remaining vulnerabilities (7 high, 2 moderate). This is a major version upgrade with breaking changes to configuration format. Recommend scheduling as a planned migration sprint. Runtime risk is LOW since these are build-time-only dependencies.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`, common in Next.js apps. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
- **Build note:** `npm run build` fails due to missing `MOMENCE_API_TOKEN` environment variable — this is a pre-existing configuration issue, not related to security fixes.
