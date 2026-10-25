# Security Scan Report

**Date:** 2026-10-25 19:25 UTC
**Status:** VULNERABILITIES_FOUND

## npm audit
- Critical: 0
- High: 1 (zod <4.6.6 — memory exhaustion via oversized constrained collections, GHSA-mrhx-c7xc-m3w5)
- Medium: 0
- Low: 0

The vulnerable zod@3.23.8 is a direct dependency used in `lib/enquiry.ts` for form validation. It also exists as a transitive dep via `eslint-plugin-react-hooks` -> `zod-validation-error`. The fix requires upgrading from zod v3 to v4, which is a breaking major version change.

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `../`, `//`, `\\` and enforces strict regex `^\/[a-zA-Z0-9/_-]+$`
2. API Auth: PASS — `/api/sips/orders` and `/api/sips/update-order` validate HMAC-SHA256 signed HttpOnly session cookies via `authenticateBarista()`
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (HTTP 500) when key missing
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order validates and caps all inputs
5. Security Headers: PASS — HSTS (2yr, includeSubDomains, preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all configured; X-Powered-By disabled
6. Image Hostnames: PASS — specific domains only (squarecdn.com, euforyc.co.uk, momence.com, specific S3 bucket, localhost); no wildcard
7. No Hardcoded Secrets: PASS — all secrets accessed via `process.env`; no `sk-`, `pk_live`, or hardcoded passwords in app/, lib/, or components/
8. No localStorage Credentials: PASS — barista sessions use HttpOnly cookies exclusively; localStorage stores only anonymous tracking UID (`euforyc_uid`)
9. No Error Leaks: PASS — API routes return generic messages to clients; detailed errors logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no API routes expose tokens or internal config

## Fixes Applied
- None — the only vulnerability (zod) requires a major version upgrade (3.x → 4.x) with breaking API changes

## Manual Action Required
- **zod@3.23.8 → 4.6.7 upgrade (HIGH)**: Memory exhaustion vulnerability in zod's constrained collection validation (GHSA-mrhx-c7xc-m3w5, CVSS 7.5). The fix requires migrating from zod v3 to v4 — a breaking change affecting import paths and several APIs. File affected: `lib/enquiry.ts`. **Mitigation in place:** request body is size-limited to 20,000 chars (`MAX_BODY_CHARS`) before reaching zod, which significantly reduces exploitability. **Recommended action:** schedule manual migration of zod v3 → v4, test all form validation paths, then deploy.
