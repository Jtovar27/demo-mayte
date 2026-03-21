/**
 * NAV CONFIG — Shared navigation links for Header and Footer.
 *
 * Add new routes here to have them appear in both Header and Footer automatically.
 */

export const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
  { href: "/services", key: "nav.services" },
  { href: "/taxes-to-go", key: "nav.taxestogo" },
  { href: "/blog", key: "nav.blog" },
  { href: "/faq", key: "nav.faq" },
  { href: "/contact", key: "nav.contact" },
] as const;
