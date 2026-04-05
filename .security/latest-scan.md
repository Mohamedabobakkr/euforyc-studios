# Security Scan Report

**Date:** 2026-04-05 11:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\`; regex allows only safe chars
2. API Auth: PASS — /api/sips/orders and /api/sips/update-order both call authenticateBarista() via HttpOnly cookie
3. Webhook Signatures: PASS — Square webhook uses HMAC-SHA256 with constant-time compare; Momence webhook uses crypto.timingSafeEqual; both fail closed when keys missing
4. Input Validation: PASS — orderId and fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted
5. Security Headers: PASS — HSTS (2yr + preload), CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy all set
6. Image Hostnames: PASS — no wildcard `**`; restricted to squarecdn.com, euforyc.co.uk, momence.com, S3, localhost
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, or hardcoded passwords found in app/lib/components
8. No localStorage Credentials: PASS — no credential storage in localStorage
9. No Error Leaks: PASS — Momence routes gate `error.details` behind `NODE_ENV === 'development'`; Square/Sips routes return static error strings; track-event's `String(error)` stays internal and is never returned to clients
10. Safe Health Checks: PASS — track-purchase, track-event, and Momence webhook GETs all return only `{ status: 'ok' }`

## Fixes Applied
- None needed — repository is clean this scan. The recharts/lodash vulnerability reappeared in the local working tree during `npm install` (presumably from a stale package.json entry), but origin/main already carries the fix (commit `61811e4` removed recharts + chart.tsx). After rebase the tree matches origin/main and `npm audit` reports 0 vulnerabilities.

## Manual Action Required
- None
