# Security Scan Report

**Date:** 2026-10-07 12:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7
- Moderate: 2
- Low: 0

All 9 vulnerabilities are in **build-time-only** dependencies. No new vulnerabilities since last scan.

### Previously Fixed (confirmed still in place)
- **source-map-js** 1.2.1 → 1.2.2 (high) — override applied
- **sharp** 0.35.4 → 0.35.5 (high) — override applied

### Remaining (require major version upgrades — no safe auto-fix)

**tailwindcss@3.4.19** (7 vulns — build-time only):
- `braces@3.0.3` (high) — stack-exhaustion DoS via deeply nested glob patterns. No patched v3 exists (3.0.3 is latest).
- `chokidar@3.6.0` → braces (high)
- `micromatch@4.0.8` → braces (high)
- `fast-glob` → micromatch (high)
- `postcss-selector-parser@6.1.4` <7.1.6 (moderate) — quadratic complexity DoS
- `postcss-nested@6.2.0` → postcss-selector-parser (moderate)

**eslint-config-next@16.4.0** (dev-time only):
- `@next/eslint-plugin-next` → fast-glob → micromatch → braces (high)

**Risk assessment:** LOW — these are build/dev-time dependencies only. Exploitation requires write access to source files (glob patterns or CSS selectors), which is already a full compromise scenario. No runtime production impact.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` with strict allowlist regex
2. API Auth: PASS — orders and update-order routes validate HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified; fails closed (500) when key missing; constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy
6. Image Hostnames: PASS — specific domains only; no wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — only analytics UUID stored client-side
9. No Error Leaks: PASS — API routes return generic messages; details logged server-side only
10. Safe Health Checks: PASS — no endpoints expose tokens or internal config

## Fixes Applied
- None needed this scan — no new vulnerabilities found. Prior overrides for source-map-js and sharp confirmed still active.

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve 7 of 9 remaining vulnerabilities. Major rewrite with breaking config changes. Recommend scheduling as a planned migration sprint. Runtime risk is LOW.
- **eslint-config-next:** Depends on braces via fast-glob chain. No patched braces v3 exists. Will resolve when braces publishes 3.0.4+ or when Next.js/eslint-config-next drops the dependency.
