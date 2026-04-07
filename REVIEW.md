---
phase: demo-mayte-standard-review
reviewed: 2026-04-07T00:00:00Z
depth: standard
files_reviewed: 41
files_reviewed_list:
  - src/app/api/admin/blog/[id]/route.ts
  - src/app/api/admin/blog/route.ts
  - src/app/api/admin/contacts/[id]/route.ts
  - src/app/api/admin/contacts/route.ts
  - src/app/api/admin/login/route.ts
  - src/app/api/admin/logout/route.ts
  - src/app/api/admin/settings/password/route.ts
  - src/app/api/admin/settings/route.ts
  - src/app/api/admin/team/[id]/route.ts
  - src/app/api/admin/team/route.ts
  - src/app/api/blog/[slug]/route.ts
  - src/app/api/blog/route.ts
  - src/app/api/chat/route.ts
  - src/app/api/contact/route.ts
  - src/app/api/site-settings/route.ts
  - src/app/api/team/route.ts
  - src/app/admin/login/page.tsx
  - src/app/admin/layout.tsx
  - src/app/admin/page.tsx
  - src/app/admin/settings/page.tsx
  - src/app/admin/settings/security/page.tsx
  - src/app/admin/team/page.tsx
  - src/app/admin/blog/page.tsx
  - src/app/admin/blog/[id]/page.tsx
  - src/app/admin/blog/new/page.tsx
  - src/app/admin/contacts/page.tsx
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/globals.css
  - src/components/ChatWidget.tsx
  - src/components/Header.tsx
  - src/components/Footer.tsx
  - src/components/ReviewCarousel.tsx
  - src/components/CTABanner.tsx
  - src/components/RootLayoutClient.tsx
  - src/lib/admin-auth.ts
  - src/lib/admin-store.ts
  - src/lib/rate-limit.ts
  - src/lib/supabase.ts
  - src/middleware.ts
  - src/context/LanguageContext.tsx
  - src/context/SiteSettingsContext.tsx
  - src/config/site.ts
findings:
  critical: 3
  warning: 4
  info: 4
  total: 11
status: issues_found
---

# Code Review Report — demo-mayte

**Reviewed:** 2026-04-07
**Depth:** standard
**Files Reviewed:** 41
**Status:** issues_found

## Summary

The codebase is a well-structured Next.js 15 + TypeScript project for a bilingual small business website with an admin panel backed by Supabase. Overall code quality is good: routes are concise, error handling is consistent in most places, authentication uses JWT + scrypt, and rate limiting is in place for public endpoints.

Three critical issues were identified, all in the authentication layer: a hardcoded fallback JWT secret present in two files, a timing-unsafe plaintext password fallback, and missing error handling in two admin contact routes. Four warnings cover an unguarded JSON parse, chat message length with no cap, a UI state bug on delete failure, and the serverless-incompatible in-memory rate limiter. Four informational items cover logic duplication and a static home page blog preview that never shows real content.

---

## Critical Issues

### CR-01: Hardcoded Fallback JWT Secret Allows Session Forgery

**Files:** `src/lib/admin-auth.ts:49`, `src/middleware.ts:5`

**Issue:** Both files define the JWT signing secret as:
```ts
process.env.ADMIN_JWT_SECRET ?? "fallback-secret-change-me"
```
If `ADMIN_JWT_SECRET` is not set in the deployment environment, the secret becomes the publicly-known string `"fallback-secret-change-me"`. An attacker who knows this string can craft a valid signed JWT and gain full admin access to the panel without a password. The secret is also duplicated across two modules, violating the single-source-of-truth principle.

**Fix:** Remove the fallback entirely. Fail loudly at startup if the env var is missing, and share the secret from one location:

```ts
// src/lib/admin-auth.ts
if (!process.env.ADMIN_JWT_SECRET) {
  throw new Error("ADMIN_JWT_SECRET environment variable is required");
}
const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);
```

In `src/middleware.ts`, import and reuse the same constant from `admin-auth` rather than re-deriving it:
```ts
import { SECRET } from "@/lib/admin-auth";
```

---

### CR-02: Plaintext Password Fallback Bypasses Timing-Safe Comparison

**File:** `src/lib/admin-auth.ts:42-46`

**Issue:** `checkPassword` falls back to a direct `===` string comparison against `process.env.ADMIN_PASSWORD` if no hash is stored in the database:
```ts
export async function checkPassword(password: string): Promise<boolean> {
  const stored = await getPasswordHash();
  if (stored) return verifyPasswordHash(password, stored);
  return password === process.env.ADMIN_PASSWORD;  // timing-unsafe
}
```
The production hashing path uses `timingSafeEqual` to prevent timing side-channel attacks. The fallback `===` comparison does not, leaking information about password length and prefix matches through response timing. Additionally, if `ADMIN_PASSWORD` is unset (empty string), the comparison `password === ""` always fails, but an empty `ADMIN_PASSWORD` env var could also allow bypass if the stored hash is also empty.

**Fix:** Remove the plaintext fallback entirely. Require the admin to set a password through the setup process (hashed in DB). If no hash is stored, deny access unconditionally:
```ts
export async function checkPassword(password: string): Promise<boolean> {
  const stored = await getPasswordHash();
  if (!stored) return false; // no password configured — deny all access
  return verifyPasswordHash(password, stored);
}
```

---

### CR-03: Missing Error Handling in Admin Contacts Routes Causes Unhandled Crashes

**File:** `src/app/api/admin/contacts/[id]/route.ts:4-27`

**Issue:** The `PATCH` and `DELETE` handlers have no `try/catch` block. Every other admin route wraps its logic in try/catch and returns a 500 on unexpected errors. If `req.json()` throws (malformed body), or if any Supabase network error occurs before the `error` check, the handler will throw an unhandled exception, resulting in a 500 with an uncontrolled response or no response at all:
```ts
export async function PATCH(req: NextRequest, { params }: ...) {
  const { id } = await params;         // no try/catch
  const body = await req.json() as ...; // throws on bad JSON — unhandled
  ...
}
```

**Fix:** Wrap both handlers consistently with the pattern used in all other admin routes:
```ts
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json() as { read: boolean };
    const { error } = await supabase
      .from("contact_submissions")
      .update({ read: body.read })
      .eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

---

## Warnings

### WR-01: No Input Size Validation on Chat Messages — Unbounded Token Cost

**File:** `src/app/api/chat/route.ts:88-100`

**Issue:** The chat API accepts messages from the client without validating individual message length or total conversation length. A user can send arbitrarily long messages (e.g., 100KB of text), causing the Anthropic API call to consume large numbers of input tokens and incur significant unexpected cost. The `filtered.slice(-6)` limit caps the number of turns but not the size of each turn.

**Fix:** Add a per-message content length cap before passing messages to the API:
```ts
const MAX_MESSAGE_LENGTH = 2000;

const filtered = messages
  .filter((m) =>
    (m.role === "user" || m.role === "assistant") &&
    m.content.trim().length > 0 &&
    m.content.length <= MAX_MESSAGE_LENGTH
  )
  .slice(-6);

if (filtered.length === 0 || filtered.every(m => m.role !== "user")) {
  return new Response("No valid user message found", { status: 400 });
}
```

---

### WR-02: Unguarded `req.json()` in Contact Route — Unhandled Parse Error

**File:** `src/app/api/contact/route.ts:19`

**Issue:** `req.json()` is called without a try/catch after the rate-limit check:
```ts
const body: ContactPayload = await req.json(); // throws on malformed JSON
```
If the client sends a malformed JSON body (or an empty body), this throws an unhandled exception, causing Next.js to return an uncontrolled 500 rather than a proper 400 error.

**Fix:** Wrap the entire handler body in try/catch, or guard just the parse:
```ts
let body: ContactPayload;
try {
  body = await req.json();
} catch {
  return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
}
```

---

### WR-03: Contacts Delete Removes Item from UI Even When API Call Fails

**File:** `src/app/admin/contacts/page.tsx:55-65`

**Issue:** `handleDelete` does not check the response status of the DELETE fetch call before removing the item from state:
```ts
async function handleDelete(id: string) {
  if (!confirm("¿Eliminar este mensaje?")) return;
  setDeletingId(id);
  try {
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((s) => s.id !== id)); // always runs on success or fail
    if (expanded === id) setExpanded(null);
  } finally {
    setDeletingId(null);
  }
}
```
If the API returns a 4xx or 5xx, the item disappears from the UI but is not deleted from the database. The admin will have to reload the page to see it again and may not realize the delete failed.

**Fix:**
```ts
async function handleDelete(id: string) {
  if (!confirm("¿Eliminar este mensaje?")) return;
  setDeletingId(id);
  try {
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Error al eliminar. Intenta de nuevo.");
      return;
    }
    setItems((prev) => prev.filter((s) => s.id !== id));
    if (expanded === id) setExpanded(null);
  } catch {
    alert("Error de conexión. Intenta de nuevo.");
  } finally {
    setDeletingId(null);
  }
}
```

---

### WR-04: In-Memory Rate Limiter Is Ineffective in Serverless Deployments

**File:** `src/lib/rate-limit.ts:12`

**Issue:** The rate limiter uses a module-level `Map` (`const store = new Map<string, Window>()`). In a serverless environment like Vercel, each function invocation may run in a separate Node.js instance with its own memory. The rate limit counter resets on every cold start and is not shared across instances. Under load, a single IP can bypass the rate limit entirely by generating enough parallel requests to hit different instances.

This affects both `/api/chat` (20 req/min) and `/api/contact` (5 req/10 min).

**Fix:** For a low-traffic site, document the known limitation clearly. For production hardening, replace with a Redis-backed solution (e.g., Upstash) or use Vercel's Edge middleware rate limiting with KV storage:
```ts
// Option: use Upstash Redis for shared, durable rate limiting
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
```
At minimum, add a code comment:
```ts
// NOTE: This in-memory limiter is per-process. In serverless deployments
// (Vercel), rate limits are not shared across instances. For production-grade
// rate limiting, use a shared store (e.g., Upstash Redis).
const store = new Map<string, Window>();
```

---

## Info

### IN-01: Public Blog Slug Lookup Fetches All Posts Instead of Querying by Slug

**File:** `src/app/api/blog/[slug]/route.ts:9-11`

**Issue:** The public blog post endpoint calls `getBlogPosts()` (which fetches the entire `blog_posts` table) and then filters in JavaScript:
```ts
const posts = await getBlogPosts();
const post = posts.find((p) => p.slug === slug && p.published);
```
The admin `getBlogPostById` function queries directly by ID. There is no equivalent direct-by-slug DB query for the public endpoint. As the blog grows, this becomes an increasingly wasteful full-table load for every blog page view.

**Suggested improvement:** Add a `getBlogPostBySlug` function to `admin-store.ts`:
```ts
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) return null;
  return data as BlogPost | null;
}
```

---

### IN-02: JWT Secret Defined in Two Places

**Files:** `src/lib/admin-auth.ts:48-50`, `src/middleware.ts:4-6`

**Issue:** The JWT `SECRET` constant is derived independently in both `admin-auth.ts` and `middleware.ts` using the same env var. If the derivation logic changes (e.g., adding a key prefix or switching algorithms), both files must be updated in sync. This is addressed as part of the CR-01 fix above but noted separately for clarity.

**Fix:** Export `SECRET` from `admin-auth.ts` and import it in `middleware.ts`, or move it to a dedicated `src/lib/jwt.ts` module.

---

### IN-03: Home Page Blog Preview Uses Static Hardcoded Translations, Not Real Blog Data

**File:** `src/app/page.tsx:23-27`

**Issue:** The "Articles & Resources" section on the home page is populated from hardcoded translation keys (`blog.a1.title`, `blog.a2.title`, `blog.a3.title`) rather than fetching live blog posts from the API. This means newly created posts never appear in the home page preview, and the displayed titles/excerpts are static placeholders.

```ts
const blogPreviews = [
  { title: t("blog.a1.title"), excerpt: t("blog.a1.excerpt"), date: "Marzo 2026", category: t("blog.cat.taxes") },
  // ...
];
```

**Suggested improvement:** Fetch the 3 most recent published posts from `/api/blog` in a `useEffect` (since this is a client component) and display them, falling back to the static placeholders while loading.

---

### IN-04: `slugify` Function Duplicated in Two Admin Pages

**Files:** `src/app/admin/blog/[id]/page.tsx:8-17`, `src/app/admin/blog/new/page.tsx:21-30`

**Issue:** The `slugify` function is copy-pasted identically into both the edit and new post pages. If the slug generation logic needs to change (e.g., to handle additional special characters), it must be updated in both places.

**Fix:** Extract to a shared utility:
```ts
// src/lib/slugify.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
```

---

_Reviewed: 2026-04-07_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
