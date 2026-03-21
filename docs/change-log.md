# Change Log

---

## Phase 3 — Services Content Expansion
**Date:** 2026-03-21

### Goal
Expand the services offering with Credit Repair, Immigration Document Assistance, and improved Business Formation/Credit content. Add mandatory compliance disclaimer for immigration-related services.

### Modified Files

| File | Change |
|---|---|
| `src/data/services.ts` | Added `categoryDisclaimerKey?: string` to `ServiceCategory` interface. Added `svc.immigration` (FileCheck icon) to Notary category with `categoryDisclaimerKey: "cat.notary.immigration.disclaimer"`. Added `svc.credit.repair` (TrendingUp icon) to Business category. Updated `svc.biz.reg` title/desc keys for clearer administrative framing. Updated `svc.biz.credit` desc key for clearer messaging. Added imports for `FileCheck` and `TrendingUp` icons. |
| `src/context/LanguageContext.tsx` | Added translation keys: `svc.immigration.title`, `svc.immigration.desc`, `svc.credit.repair.title`, `svc.credit.repair.desc`, `cat.notary.immigration.disclaimer`. Updated `svc.biz.reg.title` → "Constitución de Empresa" / "Business Formation". Updated `svc.biz.reg.desc` and `svc.biz.credit.desc` for clearer administrative framing. Updated `services.page.sub` to reflect expanded scope. |
| `src/app/services/page.tsx` | Added conditional rendering of `categoryDisclaimerKey` block below each category grid. The immigration/notary compliance notice renders as a bordered callout only under Notary & Documents. |

### New Services Added

| Service | Category | Notes |
|---|---|---|
| Documentos para Trámites Migratorios / Immigration Document Assistance | Notary & Documents | Document preparation only — non-legal framing enforced in both service description and category disclaimer |
| Reparación de Crédito / Credit Repair | Business & Credit | Administrative credit dispute process — step-by-step framing |

### Compliance
- Immigration disclaimer (`cat.notary.immigration.disclaimer`) clearly states: document preparation only, not legal advice, not an immigration attorney or accredited consultant, directs users to consult a licensed immigration attorney for legal matters.
- Immigration service card description (`svc.immigration.desc`) also contains inline non-legal framing.

### What Was NOT Changed
- No visual redesign — colors, typography, layout unchanged
- No Taxes To Go page
- No admin, no chatbot, no form changes
- Homepage, About, Blog, FAQ, Contact pages unchanged
- Taxes and Insurance category content unchanged
- `ServiceCard.tsx` component unchanged

---

## Phase 2 — Cleanup & Refactor-Readiness
**Date:** 2026-03-21

### Goal
Prepare the codebase for upcoming production upgrades without breaking the demo. Centralize business data, eliminate dead code, and create a clean extension surface for new features.

### New Files

| File | Purpose |
|---|---|
| `src/config/site.ts` | Single source of truth for all business contact data: phone, email, address, WhatsApp, hours, Google Business URL. Update this one file to change contact info site-wide. |
| `src/data/nav.ts` | Shared nav links array, imported by both Header and Footer. Adding a new route now requires one edit instead of two. |
| `src/data/services.ts` | Canonical service categories and items, extracted from the services page. Exports `serviceCategories` (used by services page) and `serviceDropdownKeys` (used by contact form). Adding a new service now requires editing this one file. |

### Modified Files

| File | Change |
|---|---|
| `src/components/Header.tsx` | Import `SITE` for phone/address in top bar and CTA button. Import `navLinks` from `data/nav`. |
| `src/components/Footer.tsx` | Import `SITE` for all contact info (phone, email, address, WhatsApp, legal name). Import `navLinks` from `data/nav`. Fixes legacy email in footer. |
| `src/components/CTABanner.tsx` | Import `SITE` for phone and WhatsApp hrefs. |
| `src/components/ChatWidget.tsx` | Import `SITE` for phone in error fallback message. |
| `src/app/page.tsx` | Import `SITE` for phone in hero CTA and address in location bar. |
| `src/app/services/page.tsx` | Import `serviceCategories` from `data/services`. Import `SITE` for hero CTA phone. |
| `src/app/contact/page.tsx` | Import `SITE` for all four contact method cards (phone, WhatsApp, email, address). Import `serviceDropdownKeys` from `data/services` for form dropdown. Fixes legacy email in contact card. |
| `src/app/faq/page.tsx` | Import `SITE` for phone and WhatsApp in "didn't find your answer" CTA block. |
| `src/app/api/chat/route.ts` | Import `SITE` for phone, email, address, and business name in all chatbot response strings. Fixes legacy email in chatbot responses. |

### Deleted Files

| File | Reason |
|---|---|
| `src/components/HeroSection.tsx` | Confirmed dead code. Old blue-gradient design. Not imported anywhere. |
| `src/components/ContactBlock.tsx` | Confirmed dead code. Old blue card design. Not imported anywhere. |

### What Was NOT Changed

- No visual changes to any page
- No new pages or routes
- No new services or content
- `LanguageContext.tsx` — translations remain in place; one display-only string (`hero.location`) still embeds the phone number as rendered text, which is acceptable for i18n display copy
- `next.config.ts` — already correctly configured for Unsplash images
- `globals.css`, `layout.tsx` — no changes needed
- `about/page.tsx`, `blog/page.tsx` — no hardcoded contact data present, no changes needed
- No form submission wiring
- No chatbot logic changes (only contact strings de-duplicated into config)
- No admin panel

### How to Update Contact Info Going Forward

Edit **`src/config/site.ts`** only. All components and API routes import from this file.

Key fields to update before going live:
- `email` — replace `inmigracion360@gmail.com` with the correct business email
- `google.reviewsUrl` — add the Google Business profile review link once confirmed

### How to Add a New Service Going Forward

1. Add the service entry to the appropriate category in **`src/data/services.ts`**
2. Add the `titleKey` and `descKey` translation strings to **`src/context/LanguageContext.tsx`**
3. The service automatically appears on `/services` and in the contact form dropdown

### How to Add a New Nav Route Going Forward

Add the route to **`src/data/nav.ts`**. It will automatically appear in both Header and Footer.

---

## Phase 1 — Repository Audit
**Date:** 2026-03-21

Completed full codebase audit. Produced `docs/repo-audit.md` covering:
- Stack and architecture
- Route map
- Component reusability
- Legacy content locations
- Technical debt
- Recommended implementation order
