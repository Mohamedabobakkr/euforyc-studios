# Security Scan Report

**Date:** 2026-11-06 11:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 13
- Low: 0

All 13 moderate vulnerabilities trace to a single root cause: `minimatch` 7.0.0-11.0.0 (GHSA-g3hv-75wg-m249, globparts amplification DoS). It is pulled in exclusively by linting toolchain packages (`eslint`, `eslint-config-next`, `typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`). These packages run only during development/CI linting and are not part of the production Next.js runtime. The fix requires a semver-major downgrade of `eslint` (10.x to 9.x) which `npm audit fix` cannot apply safely; `--force` is not used per policy.

## Code Security Checks
1. SSRF Protection: PASS - `validateSquarePath()` blocks `..`, `//`, `\\` and validates with `/^\/[a-zA-Z0-9/_-]+$/`
2. API Auth: PASS - Both `/api/sips/orders` and `/api/sips/update-order` call `authenticateBarista()` (HttpOnly cookie)
3. Webhook Signatures: PASS - HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing
4. Input Validation: PASS - Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; quantities capped at 99; string lengths truncated
5. Security Headers: PASS - HSTS (2yr + preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS - No `hostname: '**'` wildcard; uses custom image loader
7. No Hardcoded Secrets: PASS - No `sk-`, `pk_live`, or inline passwords found in app/lib/components
8. No localStorage Credentials: PASS - localStorage stores only a random analytics UID (`euforyc_uid`)
9. No Error Leaks: PASS - All API routes return generic error messages to clients; detailed errors logged server-side only
10. Safe Health Checks: PASS - No health check endpoints exist that could expose tokens or config

## Fixes Applied
- None needed

## Manual Action Required
- Consider moving `eslint`, `eslint-config-next` from `dependencies` to `devDependencies` (they are dev-only tools). This won't fix the minimatch vulnerability but follows best practice.
- The 13 moderate `minimatch` vulnerabilities will resolve when upstream packages (`eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `@typescript-eslint/typescript-estree`) release versions depending on `minimatch >= 11.0.1`. No action required for production security.
