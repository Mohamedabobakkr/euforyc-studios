# Security Scan Report

**Date:** 2026-10-04 06:15 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 7
- Medium: 0
- Low: 0

### Details
All 7 high-severity findings trace to two unfixable upstream dependency chains:

1. **braces <=3.0.3** (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested patterns)
   - No patched version exists (3.0.3 is latest)
   - Chain: `tailwindcss@3.4.19 → chokidar → braces` and `tailwindcss → micromatch → braces`
   - Also: `eslint-config-next@16.3.8 → @next/eslint-plugin-next → fast-glob → micromatch → braces`
   - Fix requires tailwindcss v4 (breaking config changes) or eslint-config-next downgrade (incompatible with Next.js 16)

2. **Risk assessment: LOW** — Both tailwindcss and eslint-config-next are build-time/dev-time tools. The braces vulnerability requires crafted glob patterns as input. In production, these packages do not process user-supplied input.

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`, enforces safe character whitelist
2. API Auth: PASS — orders and update-order routes use authenticateBarista() with HttpOnly session cookies
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed when key missing (returns 500)
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; all domains explicitly listed
7. No Hardcoded Secrets: PASS — No sk-, pk_live, or hardcoded passwords found in source
8. No localStorage Credentials: PASS — localStorage only stores anonymous `euforyc_uid` (random visitor ID)
9. No Error Leaks: PASS — All API routes return generic error messages; no `details: String(error)` or stack traces
10. Safe Health Checks: PASS — No health check endpoints exist (N/A)

## Fixes Applied
- None needed — no auto-fixable vulnerabilities found

## Manual Action Required
- **Consider upgrading to Tailwind CSS v4** when feasible to resolve braces/micromatch/chokidar chain (requires config migration)
- **Monitor braces package** for a v3.0.4+ patch release
- All code security controls are properly implemented — no code changes needed
