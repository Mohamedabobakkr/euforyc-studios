# Security Scan Report

**Date:** 2026-10-20 12:00 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 7 (all build-time only, no safe auto-fix path)
- Medium: 0
- Low: 0

### Details
All 7 HIGH findings trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested patterns). Dependency chains:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.4.1` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces@3.0.3`

**No patch exists** — `braces@3.0.3` is the latest release. The only remediation would be upgrading `tailwindcss` from v3 to v4 (major breaking change) or downgrading `eslint-config-next` to v14 (loses Next.js 16 lint rules).

**Risk assessment:** LOW — these are build-time-only dependencies. `braces` processes developer-authored glob patterns during `npm run build` and `npm run dev`, never user-supplied input in production. The DoS vector requires attacker-controlled input to `braces`, which does not occur in a deployed Next.js application.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces allowlist regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` (HMAC-SHA256 signed HttpOnly cookie)
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; rejects 500 when key missing
4. Input Validation: PASS — order IDs validated via `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order enforces length limits and item caps
5. Security Headers: PASS — HSTS (2yr + preload + includeSubDomains), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set; X-Powered-By disabled
6. Image Hostnames: PASS — no `hostname: '**'` wildcard; only specific trusted domains (squarecdn.com, euforyc.co.uk, momence.com, S3 bucket, localhost)
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, `sk_live`, `sk_test`, or hardcoded passwords found in app/, lib/, components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; no sensitive data written to localStorage
9. No Error Leaks: PASS — all API routes return generic messages to clients; internal details logged server-side only (Momence route exposes `error.details` only when `NODE_ENV === 'development'`)
10. Safe Health Checks: PASS — no health check endpoints exist; no internal config or tokens exposed

## Fixes Applied
- None — all 10 code security checks pass; npm vulnerabilities have no safe auto-fix path

## Manual Action Required
- **braces@3.0.3 (7 high):** Monitor for a `braces@3.0.4` release or plan Tailwind CSS v3→v4 migration. Low production risk since braces only runs at build time with developer-controlled input.
- **Consider devDependencies:** `tailwindcss` and `eslint-config-next` are build-time tools; moving them to `devDependencies` would correctly categorize production risk in `npm audit --omit=dev`.
