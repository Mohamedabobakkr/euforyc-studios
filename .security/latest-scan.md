# Security Scan Report

**Date:** 2026-05-12 03:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 1 (FIXED — next.js 16.2.4 → 16.2.6)
- Medium: 0
- Low: 0

### next.js 16.2.4 — 13 CVEs patched by upgrading to 16.2.6
| Severity | Advisory | Title |
|----------|----------|-------|
| High | GHSA-8h8q-6873-q5fj | DoS with Server Components |
| High | GHSA-mg66-mrh9-m8jx | DoS via connection exhaustion (Cache Components) |
| High | GHSA-c4j6-fc7j-m34r | SSRF via WebSocket upgrades |
| High | GHSA-492v-c6pp-mqqv | Middleware/Proxy bypass via dynamic route parameter injection |
| High | GHSA-267c-6grr-h53f | Middleware/Proxy bypass via segment-prefetch routes |
| High | GHSA-36qx-fr4f-26g5 | Middleware/Proxy bypass (Pages Router i18n) |
| High | GHSA-26hh-7cqf-hhc6 | Middleware/Proxy bypass (segment-prefetch, follow-up) |
| Moderate | GHSA-ffhc-5mcf-pf4q | XSS in App Router with CSP nonces |
| Moderate | GHSA-gx5p-jg67-6x7h | XSS in beforeInteractive scripts |
| Moderate | GHSA-h64f-5h5j-jqjh | DoS in Image Optimization API |
| Moderate | GHSA-wfc6-r584-vfw7 | Cache poisoning in RSC responses |
| Low | GHSA-vfv6-92ff-j949 | Cache poisoning via RSC cache-busting collisions |
| Low | GHSA-3g8h-86w9-wvmq | Middleware/Proxy redirect cache poisoning |

## Code Security Checks
1. SSRF Protection: PASS — validateSquarePath() blocks `..`, `//`, `\\`; regex enforces safe chars
2. API Auth: PASS — orders/ and update-order/ both call authenticateBarista() with HttpOnly cookie; rate-limited login (5 attempts/15 min/IP); constant-time password comparison
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; fails closed (500) when key missing; rejects invalid with 403
4. Input Validation: PASS — orderId/fulfillmentUid validated with `/^[a-zA-Z0-9_-]+$/`; state transitions whitelisted; create-order caps items at 50, modifiers at 20, strings at 100/500 chars
5. Security Headers: PASS — HSTS (preload), CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, poweredByHeader: false
6. Image Hostnames: PASS — only specific trusted domains; no wildcard `**` hostname
7. No Hardcoded Secrets: PASS — all secrets via process.env; no sk-/pk_live found
8. No localStorage Credentials: PASS — auth uses HttpOnly + Secure + SameSite cookies exclusively
9. No Error Leaks: PASS — generic messages in production; details only in dev mode
10. Safe Health Checks: PASS — no health endpoints exposing tokens or config

## Fixes Applied
- `1787726` — fix(security): upgrade next.js 16.2.4 → 16.2.6 to patch 13 CVEs

## Manual Action Required
- Run `npm install` after pulling to regenerate package-lock.json with next@16.2.6
