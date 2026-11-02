# Security Scan Report

**Date:** 2026-11-02 11:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 13 (all in `minimatch` via eslint/typescript-eslint — dev-tooling only, not production)
- Low: 0

All 13 moderate vulnerabilities trace to `minimatch` ReDoS in ESLint-related packages (`eslint`, `eslint-config-next`, `typescript-eslint`, `@typescript-eslint/*`). These are linting tools that do not run in production (`next build` does not invoke ESLint). The suggested fix requires semver-major downgrades that are not viable. No production risk.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces safe character whitelist
2. API Auth: PASS — both `/api/sips/orders` and `/api/sips/update-order` call `authenticateBarista()` via HttpOnly cookie
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed when key missing (returns 500)
4. Input Validation: PASS — order IDs validated with `/^[a-zA-Z0-9_-]+$/`; state transitions enforced; quantities capped
5. Security Headers: PASS — HSTS (63072000s, preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set; `poweredByHeader: false`
6. Image Hostnames: PASS — uses custom loader, no `hostname: '**'` wildcard, no unsafe `remotePatterns`
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no credentials stored in localStorage; auth uses HttpOnly cookies
9. No Error Leaks: PASS — all API routes return generic error messages; `error.details` only shown when `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health check endpoints that expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- Consider moving `eslint` and `eslint-config-next` from `dependencies` to `devDependencies` — they are linting tools not needed at runtime. This would also remove the 13 moderate `minimatch` vulnerabilities from production installs.
