import { promises as fs } from "fs";
import path from "path";
import { SITE } from "@/config/site";

// Resolve content dir relative to project root (process.cwd())
const CONTENT_DIR = path.join(process.cwd(), "content");

export interface BlogPost {
  id: string;
  slug: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  content: { es: string; en: string };
  category: string;
  date: string;
  published: boolean;
  image?: string;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  role: { es: string; en: string };
  email: string;
  phone: string;
}

export interface SiteSettings {
  phone: string;
  phoneRaw: string;
  email: string;
  address: { street: string; city: string; state: string; zip: string };
  hours: { weekdays: string; saturday: string; sunday: string };
  googleReviewsUrl: string;
  taxesToGoUrl: string;
}

async function readJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJSON<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(CONTENT_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  return readJSON<BlogPost[]>("blog.json");
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  return writeJSON("blog.json", posts);
}

// Team
export async function getTeamMembers(): Promise<AdminTeamMember[]> {
  return readJSON<AdminTeamMember[]>("team-admin.json");
}

export async function saveTeamMembers(members: AdminTeamMember[]): Promise<void> {
  return writeJSON("team-admin.json", members);
}

// Settings
export async function getSettings(): Promise<SiteSettings> {
  return readJSON<SiteSettings>("settings.json");
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  return writeJSON("settings.json", settings);
}

// Merged site data — settings.json overrides site.ts defaults
export interface DynamicSiteData {
  name: string;
  legalName: string;
  owner: string;
  phone: string;
  phoneRaw: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  whatsapp: string;
  address: { street: string; city: string; state: string; zip: string; full: string; mapsHref: string };
  hours: { weekdays: string; saturday: string; sunday: string; display: string; displayEn: string };
  google: { reviewsUrl: string; mapsUrl: string };
  taxesToGo: { url: string };
  logo: { path: string; alt: string };
  disclaimer: { es: string; en: string };
}

export async function getMergedSiteData(): Promise<DynamicSiteData> {
  const s = await getSettings();
  const phoneRaw = s.phoneRaw || SITE.phoneRaw;
  const email = s.email || SITE.email;
  const addr = {
    street: s.address.street || SITE.address.street,
    city: s.address.city || SITE.address.city,
    state: s.address.state || SITE.address.state,
    zip: s.address.zip || SITE.address.zip,
  };
  const full = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
  return {
    name: SITE.name,
    legalName: SITE.legalName,
    owner: SITE.owner,
    phone: s.phone || SITE.phone,
    phoneRaw,
    phoneHref: `tel:${phoneRaw}`,
    email,
    emailHref: `mailto:${email}`,
    whatsapp: `https://wa.me/1${phoneRaw}`,
    address: { ...addr, full, mapsHref: `https://maps.google.com/?q=${encodeURIComponent(full)}` },
    hours: {
      weekdays: s.hours.weekdays || SITE.hours.weekdays,
      saturday: s.hours.saturday || SITE.hours.saturday,
      sunday: s.hours.sunday || SITE.hours.sunday,
      display: SITE.hours.display,
      displayEn: SITE.hours.displayEn,
    },
    google: {
      reviewsUrl: s.googleReviewsUrl || SITE.google.reviewsUrl,
      mapsUrl: SITE.google.mapsUrl,
    },
    taxesToGo: { url: s.taxesToGoUrl || SITE.taxesToGo.url },
    logo: { path: SITE.logo.path as string, alt: SITE.logo.alt },
    disclaimer: { es: SITE.disclaimer.es, en: SITE.disclaimer.en },
  };
}
