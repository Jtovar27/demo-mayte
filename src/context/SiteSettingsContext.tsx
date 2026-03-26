"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SITE } from "@/config/site";
import type { DynamicSiteData } from "@/lib/admin-store";

// Default value mirrors SITE so there's no flash on first render
const DEFAULT: DynamicSiteData = {
  name: SITE.name,
  legalName: SITE.legalName,
  owner: SITE.owner,
  phone: SITE.phone,
  phoneRaw: SITE.phoneRaw,
  phoneHref: SITE.phoneHref,
  email: SITE.email,
  emailHref: SITE.emailHref,
  whatsapp: SITE.whatsapp,
  address: {
    street: SITE.address.street,
    city: SITE.address.city,
    state: SITE.address.state,
    zip: SITE.address.zip,
    full: SITE.address.full,
    mapsHref: SITE.address.mapsHref,
  },
  hours: {
    weekdays: SITE.hours.weekdays,
    saturday: SITE.hours.saturday,
    sunday: SITE.hours.sunday,
    display: SITE.hours.display,
    displayEn: SITE.hours.displayEn,
  },
  google: {
    reviewsUrl: SITE.google.reviewsUrl,
    mapsUrl: SITE.google.mapsUrl,
  },
  taxesToGo: { url: SITE.taxesToGo.url },
  logo: { path: SITE.logo.path as string, alt: SITE.logo.alt },
  disclaimer: { es: SITE.disclaimer.es, en: SITE.disclaimer.en },
};

const SiteSettingsContext = createContext<DynamicSiteData>(DEFAULT);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<DynamicSiteData>(DEFAULT);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((data: unknown) => {
        if (data && typeof data === "object" && "phone" in data) {
          setSite(data as DynamicSiteData);
        }
      })
      .catch(() => {/* keep defaults */});
  }, []);

  return (
    <SiteSettingsContext.Provider value={site}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): DynamicSiteData {
  return useContext(SiteSettingsContext);
}
