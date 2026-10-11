# Security Scan Report

**Date:** 2026-10-11 19:30 UTC
**Status:** CLEAN

## npm audit
- Critical: 0
- High: 7
- Medium: 0
- Low: 0

### Remaining High Vulnerabilities (all build-time only)
All 7 vulnerabilities trace to `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm — stack-exhaustion DoS via deeply nested glob patterns). The dependency chain is:
- `tailwindcss@3.4.19` → `chokidar@3.6.0` → `braces@3.0.3`
- `tailwindcss@3.4.19` → `micromatch@4.0.8` → `braces@3.0.3`
- `eslint-config-next@16.4.0` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`

**Risk assessment:** LOW — braces is only invoked during `npm run build` / `npx tailwindcss` with developer-controlled glob patterns, never with user input at runtime. eslint runs only during development linting. No fix exists within braces 3.x; tailwindcss v4 drops the dependency but is a major breaking change.

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
- None needed this scan — no new vulnerabilities since last scan

## Manual Action Required
- **tailwindcss v3 → v4 migration:** Would resolve all 7 remaining high vulnerabilities. Major version upgrade with breaking config/class changes. Runtime risk is LOW since these are build-time-only dependencies.
