# Security Scan Report

**Date:** 2026-07-27 19:30 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0 (was 9, all fixed)
- Medium: 0
- Low: 0

## Code Security Checks
1. SSRF Protection: PASS
2. API Auth: PASS
3. Webhook Signatures: PASS
4. Input Validation: PASS
5. Security Headers: PASS
6. Image Hostnames: PASS
7. No Hardcoded Secrets: PASS
8. No localStorage Credentials: PASS
9. No Error Leaks: PASS
10. Safe Health Checks: PASS

## Fixes Applied
- Upgraded eslint 9.x to 10.x and eslint-config-next 15.x to 16.x
- Added minimatch >=10.2.6 override to eliminate vulnerable brace-expansion <=5.0.7 from transitive deps
- Removed now-unnecessary brace-expansion override (superseded by minimatch override)
- Resolved all 9 high-severity npm audit findings (brace-expansion DoS, GHSA-mh99-v99m-4gvg)

## Manual Action Required
- Build is currently failing due to Momence API outage (503 "Service temporarily unavailable") during page data collection for /api/momence/events. This is a pre-existing issue unrelated to any code or dependency changes. Build will recover when the Momence API comes back online.
- CSP includes `unsafe-inline` and `unsafe-eval` in script-src — acceptable for Next.js SSR but worth reviewing if inline scripts can be moved to nonces in future.
