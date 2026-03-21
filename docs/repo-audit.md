# Repository Audit — Taxes & Insurance Group LLC Demo

**Date:** 2026-03-21
**Auditor:** Claude Code
**Working directory:** `demo-mayte ` (note: directory has a trailing space)

---

## 1. Current Stack and Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.7 — App Router |
| UI Runtime | React 19.2.3 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (PostCSS) |
| Icons | lucide-react 0.577 |
| Fonts | DM Sans (body) + Cormorant Garamond (headings) via next/font/google |
| AI SDK | @anthropic-ai/sdk 0.80 — **installed but not used** (chatbot is mock) |
| Hosting target | Vercel (next.config.ts default) |

**Project structure:**
```
src/
  app/
    layout.tsx          ← root layout: fonts, Header, Footer, ChatWidget, LanguageProvider
    page.tsx            ← homepage
    about/page.tsx
    services/page.tsx
    blog/page.tsx
    faq/page.tsx
    contact/page.tsx
    api/chat/route.ts   ← mock chatbot API endpoint
    globals.css
  components/
    Header.tsx
    Footer.tsx
    ChatWidget.tsx
    CTABanner.tsx
    ServiceCard.tsx
    HeroSection.tsx     ← DEAD CODE — not imported anywhere
    ContactBlock.tsx    ← DEAD CODE — not imported anywhere
  context/
    LanguageContext.tsx ← all i18n translations (~240 lines in one object)
docs/
  demo-audit.md
  repo-audit.md         ← this file
```

---

## 2. Current Route Map

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage: hero, trust bar, services preview, about teaser, blog preview, location bar |
| `/about` | `src/app/about/page.tsx` | Story, values, founder section |
| `/services` | `src/app/services/page.tsx` | Full service listing by category |
| `/blog` | `src/app/blog/page.tsx` | 4 static article previews — no individual article pages |
| `/faq` | `src/app/faq/page.tsx` | Accordion-style FAQ by category |
| `/contact` | `src/app/contact/page.tsx` | Contact methods + form (UI only, no submission) |
| `/api/chat` | `src/app/api/chat/route.ts` | POST endpoint — mock keyword-based chatbot, streams word-by-word |

**Missing routes (required):**
- `/services/taxes-to-go` — Taxes To Go dedicated page
- `/admin` — Admin panel (future)

---

## 3. Navigation Definition

Navigation links are **defined twice** — once in `Header.tsx` and once in `Footer.tsx` — both as identical arrays:

```ts
const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/blog", key: "nav.blog" },
  { href: "/faq", key: "nav.faq" },
  { href: "/contact", key: "nav.contact" },
];
```

This duplication is a low-priority tech debt item. Adding a new route requires editing both files.

---

## 4. Services Content — Is It Data-Driven?

**Yes.** `src/app/services/page.tsx` defines services as a structured array:

```ts
const serviceCategories = [
  { categoryKey: "cat.taxes", services: [ { titleKey, descKey, icon }, ... ] },
  { categoryKey: "cat.insurance", services: [ ... ] },
  { categoryKey: "cat.notary", services: [ ... ] },
  { categoryKey: "cat.business", services: [ ... ] },
];
```

Current service categories and items:
- **Impuestos:** Personal, Empresarial
- **Seguros:** Salud (Obamacare/ACA), Vida y Medicare
- **Notaría y Documentos:** Notario Público, Apostillas, Poderes Notariales, Fe de Vida, Traducciones Certificadas
- **Negocios y Crédito:** Registro de Empresa, Crédito Empresarial, Préstamos

**Important duplication:** The homepage (`page.tsx`) uses a separate, shorter set of service keys (`svc.taxes.personal.title` vs `svc.taxes.personal.full.title`) — abbreviated versions for the preview section. This means adding a service requires updating both the services page array and (if featured on home) the `featuredServices` array in `page.tsx`.

---

## 5. i18n / Translation System

All translations live in a single `Record<string, Record<"es"|"en", string>>` object inside `src/context/LanguageContext.tsx`. It currently spans ~240 lines and covers all pages.

**Strengths:** Simple, no external dependency, works at runtime.
**Weaknesses:** One file grows unboundedly. Adding new services, pages, or chatbot content means editing this single file. No type-safety on key names. No fallback chain.

**Sections currently in translations:**
- NAV, HEADER, HERO, TRUST BAR
- SERVICES SECTION (home abbreviated + services page full)
- SERVICE CATEGORIES (all 12 services)
- ABOUT (home teaser + full about page)
- BLOG (4 article titles/excerpts + page labels)
- CONTACT PAGE (all labels + form fields)
- FAQ PAGE (all questions/answers)
- FOOTER, CTA BANNER, LOCATION BAR

---

## 6. Reusable Components

| Component | Reusable? | Notes |
|---|---|---|
| `ServiceCard` | ✅ Yes | Accepts `title`, `description`, `icon?`, `featured?`. Works for any service. |
| `CTABanner` | ✅ Yes | Already reused on About, Services, Blog, FAQ pages. |
| `Header` | ✅ Yes | Sticky, responsive, bilingual toggle. Solid. |
| `Footer` | ✅ Yes | 4-column layout. Contains legacy email (must fix). |
| `ChatWidget` | ✅ Yes (upgradeable) | Clean UI component. API call is to `/api/chat`. Easy to upgrade backend. |
| `HeroSection` | ❌ Dead code | Old blue/amber gradient design. Not imported anywhere. Safe to delete. |
| `ContactBlock` | ❌ Dead code | Old blue card design. Not imported anywhere. Safe to delete. |

---

## 7. Where Legacy Email Appears

The legacy email `inmigracion360@gmail.com` must be replaced. It appears in **3 files**:

| File | Location | Context |
|---|---|---|
| `src/components/Footer.tsx` | Line 71 | `<a href="mailto:inmigracion360@gmail.com">` in footer contact column |
| `src/app/contact/page.tsx` | Line 11 | `contactMethods` array — email card href and display text |
| `src/app/api/chat/route.ts` | Lines 86–87, 92–93 | Hardcoded in "Thank you" and fallback chatbot responses |

**Action required:** Replace with the correct business email in all 3 locations before any client-facing demo.

---

## 8. Form Handling — Current State

The contact form in `src/app/contact/page.tsx` is **UI only**:
- No `action` attribute
- No `onSubmit` handler
- No API route for form submission
- No validation feedback to user

Adding form submission requires:
1. Creating a server action or API route (`/api/contact`)
2. Wiring the form's `onSubmit`
3. Adding success/error state feedback

---

## 9. Chatbot — Current State

**Architecture:** Client (`ChatWidget.tsx`) → POST `/api/chat` → mock handler (`route.ts`)

The mock handler:
- Detects Spanish via keyword regex
- Matches keywords to canned responses (taxes, insurance, notary, business, hours, location, price, greetings)
- Simulates streaming by sending one word at a time with random delay (20–60ms)

**`@anthropic-ai/sdk` is installed but not used.** The upgrade path is clean:
Replace the `getMockResponse()` / `streamWords()` logic in `route.ts` with a real Anthropic API streaming call, constrained by a system prompt.

**Issue:** Chatbot hardcodes `inmigracion360@gmail.com` in its responses (see section 7).

---

## 10. Admin-Related Code

**None exists.** There is no:
- Admin route or page
- Authentication system
- CMS or content editing layer
- Database connection

---

## 11. Risks and Technical Debt

| Risk | Severity | Description |
|---|---|---|
| Legacy email in 3 files | HIGH | Must be replaced before any real client contact |
| Contact form has no backend | HIGH | Submitting the form does nothing |
| All translations in one file | MEDIUM | Will become unmaintainable at ~400+ keys |
| Dead components (HeroSection, ContactBlock) | LOW | Unused but not harmful — just clutter |
| Nav links duplicated in Header + Footer | LOW | Editing nav requires two file changes |
| Home services duplicated as abbreviated keys | LOW | Adding a service requires coordinating two arrays |
| No per-page metadata (SEO) | MEDIUM | Only root layout has `<title>` and description |
| Blog articles not individually routable | LOW | All "Read more" links go to `/blog` list |
| Chatbot uses hardcoded keyword matching | MEDIUM | No context, no memory, no guardrails |
| Unsplash images hardcoded | LOW | Fine for demo; production should use owned assets |

---

## 12. What Can Be Reused Safely

Everything except the two dead components can be reused as-is:

- Design system (color palette `#B9954F` gold, `#1C1C1C` dark, `#F5F5F5` light bg) — fully consistent
- `ServiceCard`, `CTABanner`, `Header`, `Footer` — solid, production-quality
- `ChatWidget` UI — keep the component, only the backend changes
- `LanguageContext` pattern — keep the context structure, can extract translations to a separate file
- Page structure pattern (hero + content sections + CTABanner) — consistent and reusable

---

## 13. Legacy Content That Must Be Replaced

| Item | Location | Required Replacement |
|---|---|---|
| `inmigracion360@gmail.com` | Footer, Contact page, Chatbot | Correct business email |
| Unsplash stock photos | All page heroes, About page | Real business photos (owner, office) when available |
| Founder avatar placeholder `MR` initials | `about/page.tsx` | Real photo of Mayte F. Roses Soto when available |
| Hardcoded `inmigracion360@gmail.com` in chatbot responses | `api/chat/route.ts` | Correct email in all response strings |

---

## 14. Recommended Refactor Strategy

**Approach: Refactor in place — do NOT restructure the app.**

The architecture is already clean and well-organized. The component hierarchy, routing, and design system are production-quality. The right strategy is incremental enhancement, not a rebuild.

**Where to extract (when needed):**
- Move translations object from `LanguageContext.tsx` to `src/data/translations.ts` — keeps the context file clean
- Move services data from inline in `services/page.tsx` to `src/data/services.ts` — enables reuse and admin editability later

---

## 15. Recommended Implementation Order

### Phase 1 — Cleanup (prerequisite, non-destructive)
1. Replace `inmigracion360@gmail.com` in Footer, Contact page, and Chatbot responses
2. Delete `HeroSection.tsx` and `ContactBlock.tsx` (dead code)
3. Add `next.config.ts` hostname for Unsplash images if not already present

### Phase 2 — Content Expansion
4. Add **Reparación de Crédito** (Credit Repair) as a new service under Negocios y Crédito
5. Add **Procesamiento de Documentos de Inmigración** under Notaría, with strict non-legal disclaimer
6. Improve Business Creation description (clearer process explanation)
7. Add translations for all new content to `LanguageContext.tsx`

### Phase 3 — New Pages
8. Create `/services/taxes-to-go` dedicated page with process steps + CTA
9. OR add a Taxes To Go section to the existing services page (decision pending)

### Phase 4 — Engagement Features
10. Add **Google Reviews section** to homepage (between blog preview and CTA banner)
11. Add "Leave a review" CTA linking to Google Business profile

### Phase 5 — Form Wiring
12. Add **preferred team member selection** field to contact form
13. Wire contact form to an API route (`/api/contact`) with email notification
14. Add form success/error state feedback

### Phase 6 — Chatbot Upgrade
15. Replace mock keyword handler in `api/chat/route.ts` with Anthropic SDK streaming call
16. Implement safe system prompt: restrict to business services only, no legal advice, redirect complex questions to call

### Phase 7 — Admin Panel (future)
17. Design data abstraction layer (services, blog, FAQ as JSON or DB)
18. Add admin route with auth
19. Build content editing UI

---

## 16. Refactor in Place vs. Gradual Restructure — Decision

**Refactor in place.**

Reasons:
- The existing structure is clean and conventional (Next.js App Router best practices)
- All components follow a consistent design system
- i18n context pattern works — only needs content extracted to a separate file when it grows too large
- No framework migration needed
- No routing restructure needed

The only structural change worth making proactively is extracting translations and services data to `src/data/` files — but this can wait until Phase 5–6 when the content volume justifies it.

---

## 17. Summary Table — Feature Readiness

| Feature | Status | Effort |
|---|---|---|
| Add Taxes To Go page | Missing | Medium (new page + translations) |
| Add Credit Repair service | Missing | Low (new array entry + translations) |
| Refine Business Creation | Partial | Low (translations update) |
| Google Reviews section | Missing | Low (new homepage section) |
| Team member selection in form | Missing | Low (new form field) |
| Form submission backend | Missing | Medium (new API route + email) |
| Admin content editability | Missing | High (auth + CMS layer) |
| Chatbot with real AI | Mock only | Medium (swap `route.ts` handler) |
| Immigration document processing | Missing | Low (new service entry + disclaimer) |
| Fix legacy email | Exists in 3 files | Trivial |
| Delete dead components | 2 files | Trivial |
