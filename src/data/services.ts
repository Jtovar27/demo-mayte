/**
 * SERVICES DATA — Canonical service categories and items.
 *
 * Used by:
 *   - src/app/services/page.tsx (full listing)
 *   - src/app/contact/page.tsx (service dropdown options)
 *
 * To add a new service:
 *   1. Add the entry to the relevant category array below (with titleKey, descKey, icon).
 *   2. Add the corresponding translation keys to src/context/LanguageContext.tsx.
 *   3. The service will automatically appear on the services page and in the contact form dropdown.
 *
 * To add a new category:
 *   1. Add a new object to serviceCategories with categoryKey and services[].
 *   2. Add the categoryKey translation to LanguageContext.tsx.
 *
 * Icons are from lucide-react. Import only what is used here.
 */

import {
  FileText,
  Briefcase,
  HeartPulse,
  Users,
  Stamp,
  Globe,
  Scale,
  ClipboardCheck,
  Languages,
  Building2,
  CreditCard,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

export interface ServiceCategory {
  categoryKey: string;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    categoryKey: "cat.taxes",
    services: [
      {
        titleKey: "svc.taxes.personal.full.title",
        descKey: "svc.taxes.personal.full.desc",
        icon: FileText,
      },
      {
        titleKey: "svc.taxes.business.full.title",
        descKey: "svc.taxes.business.full.desc",
        icon: Briefcase,
      },
    ],
  },
  {
    categoryKey: "cat.insurance",
    services: [
      {
        titleKey: "svc.ins.health.title",
        descKey: "svc.ins.health.desc",
        icon: HeartPulse,
      },
      {
        titleKey: "svc.ins.life.title",
        descKey: "svc.ins.life.desc",
        icon: Users,
      },
    ],
  },
  {
    categoryKey: "cat.notary",
    services: [
      {
        titleKey: "svc.notary.pub.title",
        descKey: "svc.notary.pub.desc",
        icon: Stamp,
      },
      {
        titleKey: "svc.apostille.title",
        descKey: "svc.apostille.desc",
        icon: Globe,
      },
      {
        titleKey: "svc.power.title",
        descKey: "svc.power.desc",
        icon: Scale,
      },
      {
        titleKey: "svc.fevida.title",
        descKey: "svc.fevida.desc",
        icon: ClipboardCheck,
      },
      {
        titleKey: "svc.translation.title",
        descKey: "svc.translation.desc",
        icon: Languages,
      },
      // TODO Phase 3: add immigration document processing entry here
    ],
  },
  {
    categoryKey: "cat.business",
    services: [
      {
        titleKey: "svc.biz.reg.title",
        descKey: "svc.biz.reg.desc",
        icon: Building2,
      },
      {
        titleKey: "svc.biz.credit.title",
        descKey: "svc.biz.credit.desc",
        icon: CreditCard,
      },
      {
        titleKey: "svc.loans.title",
        descKey: "svc.loans.desc",
        icon: Banknote,
      },
      // TODO Phase 3: add Credit Repair entry here
    ],
  },
];

/**
 * Flat list of all service title keys, in order.
 * Used to populate the contact form's service dropdown.
 */
export const serviceDropdownKeys: string[] = serviceCategories.flatMap(
  (cat) => cat.services.map((svc) => svc.titleKey)
);
