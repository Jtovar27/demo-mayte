---
phase: 01
fixed_at: 2026-04-07T00:00:00Z
review_path: /Users/jtovar_27/demos/demo-mayte /REVIEW.md
iteration: 1
findings_in_scope: 7
fixed: 7
skipped: 0
status: all_fixed
---

# Phase 01: Code Review Fix Report

**Fixed at:** 2026-04-07
**Source review:** /Users/jtovar_27/demos/demo-mayte /REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 7
- Fixed: 7
- Skipped: 0

## Fixed Issues

### CR-01: Hardcoded Fallback JWT Secret Allows Session Forgery

**Files modified:** `src/lib/admin-auth.ts`, `src/middleware.ts`
**Commit:** c358de3
**Applied fix:** Removed the `?? "fallback-secret-change-me"` fallback from both files. Added a startup guard in `admin-auth.ts` that throws if `ADMIN_JWT_SECRET` is not set, and exported `SECRET` as a named export. Updated `middleware.ts` to import `SECRET` from `@/lib/admin-auth` instead of re-deriving it locally.

### CR-02: Plaintext Password Fallback Bypasses Timing-Safe Comparison

**Files modified:** `src/lib/admin-auth.ts`
**Commit:** c358de3
**Applied fix:** Removed the `return password === process.env.ADMIN_PASSWORD` fallback from `checkPassword`. If no hash is stored, the function now returns `false` unconditionally, denying all access until a proper hashed password is configured.

### CR-03: Missing Error Handling in Admin Contacts Routes Causes Unhandled Crashes

**Files modified:** `src/app/api/admin/contacts/[id]/route.ts`
**Commit:** 414b2ec
**Applied fix:** Wrapped both `PATCH` and `DELETE` handlers in `try/catch` blocks that return a 500 JSON response on unexpected errors, consistent with all other admin route handlers.

### WR-01: No Input Size Validation on Chat Messages — Unbounded Token Cost

**Files modified:** `src/app/api/chat/route.ts`
**Commit:** 6f50bea
**Applied fix:** Added `MAX_MESSAGE_LENGTH = 2000` constant and added `m.content.length <= MAX_MESSAGE_LENGTH` to the filter predicate, dropping oversized messages before they reach the Anthropic API.

### WR-02: Unguarded `req.json()` in Contact Route — Unhandled Parse Error

**Files modified:** `src/app/api/contact/route.ts`
**Commit:** d352f1c
**Applied fix:** Wrapped `req.json()` in a `try/catch` block that returns a 400 JSON error response on malformed input, rather than allowing an unhandled exception to bubble up.

### WR-03: Contacts Delete Removes Item from UI Even When API Call Fails

**Files modified:** `src/app/admin/contacts/page.tsx`
**Commit:** bcf5fa3
**Applied fix:** Stored the fetch response in `res`, checked `res.ok` before updating state, and added a `catch` block for network errors. Both failure paths show a Spanish-language alert to the admin without removing the item from the list.

### WR-04: In-Memory Rate Limiter Is Ineffective in Serverless Deployments

**Files modified:** `src/lib/rate-limit.ts`
**Commit:** 117ad38
**Applied fix:** Added a code comment above the `store` declaration documenting the per-process limitation and recommending Upstash Redis for production-grade shared rate limiting.

---

_Fixed: 2026-04-07_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
