# Security Scan Report

**Date:** 2026-11-27 06:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\` and enforces `^\/[a-zA-Z0-9/_-]+$` regex on path portion
2. API Auth: PASS — orders and update-order routes call `authenticateBarista()` (HMAC-SHA256 signed HttpOnly cookie); reject 401 on failure
3. Webhook Signatures: PASS — HMAC-SHA256 verification with constant-time comparison; fails closed (500) when key missing; rejects 403 on invalid
4. Input Validation: PASS — orderId/fulfillmentUid validated with `^[a-zA-Z0-9_-]+$`; create-order caps items (50), quantities (99), input lengths; enquiry uses zod schema + body size cap (20KB)
5. Security Headers: PASS — HSTS (2yr, preload), CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy all set; X-Powered-By disabled
6. Image Hostnames: PASS — custom loader used, no `remotePatterns` or `hostname: '**'` wildcards in next.config.js
7. No Hardcoded Secrets: PASS — no `sk-`, `pk_live`, `sk_live`, `sk_test`, `pk_test`, or hardcoded credentials found in app/lib/components
8. No localStorage Credentials: PASS — only stores `euforyc_uid` (random analytics UUID), no tokens or passwords
9. No Error Leaks: PASS — all API routes return generic messages to clients; `error.details` in Momence routes gated behind `NODE_ENV=development`; enquiry error reasons logged server-side only
10. Safe Health Checks: PASS — no health/status/ping endpoints exist; no endpoints expose tokens or internal config

## Fixes Applied
- None needed

## Manual Action Required
- None
