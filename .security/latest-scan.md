# Security Scan Report

**Date:** 2026-10-08 15:30 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 7
- Moderate: 2
- Low: 0

### Details
All 9 remaining vulnerability entries are in **build-time dependencies** (not production runtime):

1. **braces** (high) — DoS via deeply nested patterns (GHSA-vfj7-8cjw-p6xm). Transitive dep of tailwindcss@3.4.19 and eslint-config-next@16.4.0. Fix requires tailwindcss v4 (breaking migration).
2. **chokidar** (high) — depends on vulnerable braces. Transitive dep of tailwindcss.
3. **micromatch** (high) — depends on vulnerable braces. Transitive dep of tailwindcss and eslint-config-next.
4. **fast-glob** (high) — depends on vulnerable micromatch. Transitive dep of tailwindcss and @next/eslint-plugin-next.
5. **@next/eslint-plugin-next** (high) — depends on vulnerable fast-glob. Transitive dep of eslint-config-next.
6. **eslint-config-next** (high) — depends on vulnerable @next/eslint-plugin-next.
7. **tailwindcss** (high) — depends on braces, chokidar, micromatch, fast-glob, postcss-nested, postcss-selector-parser.
8. **postcss-selector-parser** (moderate) — quadratic complexity DoS (GHSA-rj75-hqrm-r3gf). Transitive dep of tailwindcss.
9. **postcss-nested** (moderate) — depends on vulnerable postcss-selector-parser. Transitive dep of tailwindcss.

**Already patched (resolved in current lockfile):**
- sharp@0.35.5 (was < 0.35.5 — librsvg CVE-2026-96889)
- source-map-js@1.2.2 (was < 1.2.2 — event-loop DoS GHSA-68fv-2mgg-jv7q)

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces safe character regex
2. API Auth: PASS — orders and update-order routes use `authenticateBarista()` with HttpOnly session cookie
3. Webhook Signatures: PASS — fails closed when SQUARE_WEBHOOK_SIGNATURE_KEY missing (returns 500); constant-time HMAC-SHA256 verification
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions validated; order items capped at 50; input lengths truncated
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy
6. Image Hostnames: PASS — no wildcard `**` hostname; only specific trusted domains in remotePatterns
7. No Hardcoded Secrets: PASS — all secrets loaded from environment variables
8. No localStorage Credentials: PASS — no localStorage storing passwords/tokens/secrets
9. No Error Leaks: PASS — all API routes return generic error messages; internal details only logged server-side
10. Safe Health Checks: PASS — no health check endpoints expose tokens or config

## Fixes Applied
- None needed this scan — sharp and source-map-js already patched in prior scans; all code security checks pass

## Manual Action Required
- **tailwindcss v3 → v4 migration**: Resolves 7 of 9 npm vulnerability entries. Major rewrite of CSS toolchain. Recommend scheduling as a dedicated task.
- **eslint-config-next**: Remaining 2 entries are in the linting toolchain. Monitor for a patch release of eslint-config-next@16 that updates its fast-glob dependency.
- **Risk assessment**: All 9 vulnerabilities are DoS-type (not RCE) in build-time tools. They cannot be exploited by website visitors. Production runtime is not affected.
- **CSP hardening (optional):** CSP includes `'unsafe-inline' 'unsafe-eval'` in `script-src`, common for Next.js apps. Migrating to nonce-based scripts would strengthen CSP but requires Next.js configuration changes.
