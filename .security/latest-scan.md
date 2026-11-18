# Security Scan Report

**Date:** 2026-11-18 03:26 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 18 (all picomatch ReDoS — build-only tools, not production runtime)
- Medium: 0
- Low: 0

### Details
All 18 HIGH findings are the same picomatch ReDoS vulnerability (GHSA-fc5q-39xc-vjpf) reached through:
- **tailwindcss v3.4.19** → chokidar → anymatch/readdirp → picomatch; micromatch → picomatch; fast-glob → micromatch → picomatch
- **eslint-config-next v16.4.5** → @next/eslint-plugin-next → fast-glob → micromatch → picomatch; typescript-eslint → @typescript-eslint/* → tinyglobby → picomatch; eslint-import-resolver-typescript → tinyglobby → picomatch

**Risk assessment:** LOW — these are build/lint tools that process developer-controlled glob patterns at build time. They never execute in the production runtime. The picomatch ReDoS requires attacker-controlled glob patterns, which is not possible in this architecture.

**Fix path:**
- tailwindcss: requires upgrade to v4.x (major rewrite, different config format — manual migration needed)
- eslint-config-next: npm suggests downgrade to v14.2.35 which is incompatible with Next.js 16
- `npm audit fix` found no new safe updates to apply (transitive deps already updated in prior scan)

**No change since last scan (2026-11-17).** Same 18 picomatch findings, no new vulnerabilities introduced.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces `/[a-zA-Z0-9/_-]+` pattern
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` both call `authenticateBarista()` via HttpOnly cookie
3. Webhook Signatures: PASS — fails closed (500) when `SQUARE_WEBHOOK_SIGNATURE_KEY` missing; HMAC-SHA256 with constant-time comparison
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions checked against whitelist
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — uses custom image loader, no `hostname: '**'` wildcard
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — only stores anonymous analytics UUID (`euforyc_uid`), no credentials
9. No Error Leaks: PASS — all API routes return generic error messages; dev-only details guarded by `NODE_ENV === 'development'`
10. Safe Health Checks: PASS — no health check endpoints expose tokens or internal config

## Fixes Applied
- None needed — no new vulnerabilities since last scan

## Manual Action Required
- **Tailwind CSS v4 migration** — upgrading from v3.4.19 to v4.x resolves the picomatch vulnerability chain but requires manual config migration (new CSS-first config, different plugin API). Schedule during a planned refactor.
- **eslint-config-next** — the picomatch chain through eslint-config-next will resolve when the Next.js team ships a version that uses picomatch >= 3.0.2 or drops affected transitive dependencies. Monitor future releases.
