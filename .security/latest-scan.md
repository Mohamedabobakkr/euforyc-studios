# Security Scan Report

**Date:** 2026-11-10 00:00 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 0
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS — `validateSquarePath()` blocks `..`, `//`, `\\`, enforces leading `/`, allows only safe characters.
2. API Auth: PASS — Both orders and update-order routes call `authenticateBarista()` and return 401 on failure.
3. Webhook Signatures: PASS — HMAC-SHA256 verified with constant-time comparison; returns 500 (fail-closed) when key is missing.
4. Input Validation: PASS — Order IDs validated with `/^[a-zA-Z0-9_-]+$/`; input lengths capped; state transitions whitelisted.
5. Security Headers: PASS — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all configured.
6. Image Hostnames: PASS — No `hostname: '**'` wildcard; images use custom loader with pre-sized static files.
7. No Hardcoded Secrets: PASS — No `sk-`, `sk_live`, `pk_live`, or hardcoded passwords found.
8. No localStorage Credentials: PASS — Only stores anonymous visitor UID; no passwords, tokens, or secrets.
9. No Error Leaks: PASS — All API routes return generic messages; details gated behind `NODE_ENV === 'development'`.
10. Safe Health Checks: PASS — No health check endpoints expose tokens or internal config.

## Fixes Applied
- None needed

## Manual Action Required
- None
