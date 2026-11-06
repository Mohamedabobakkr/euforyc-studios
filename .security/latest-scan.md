# Security Scan Report

**Date:** 2026-11-06 19:23 UTC
**Status:** FIXES_APPLIED

## npm audit
- Critical: 0
- High: 0
- Medium: 0 (was 13, fixed)
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
- `268289e` fix(security): upgrade minimatch override to ^11.0.1 to fix DoS vulnerability (GHSA-g3hv-75wg-m249) - resolved all 13 moderate advisories from minimatch 7.0.0-11.0.0 globparts amplification DoS

## Manual Action Required
- None
