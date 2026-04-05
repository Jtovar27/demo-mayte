import { supabase } from "@/lib/supabase";
import { SITE } from "@/config/site";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as BlogPost;
}

export async function createBlogPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<AdminTeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdminTeamMember[];
}

export async function getTeamMemberById(id: string): Promise<AdminTeamMember | null> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as AdminTeamMember;
}

export async function createTeamMember(member: Omit<AdminTeamMember, "id">): Promise<AdminTeamMember> {
  const { data, error } = await supabase
    .from("team_members")
    .insert(member)
    .select()
    .single();
  if (error) throw error;
  return data as AdminTeamMember;
}

export async function updateTeamMember(id: string, updates: Partial<AdminTeamMember>): Promise<AdminTeamMember> {
  const { data, error } = await supabase
    .from("team_members")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as AdminTeamMember;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  return {
    phone: data.phone,
    phoneRaw: data.phone_raw,
    email: data.email,
    address: data.address,
    hours: data.hours,
    googleReviewsUrl: data.google_reviews_url,
    taxesToGoUrl: data.taxes_to_go_url,
  };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    phone: settings.phone,
    phone_raw: settings.phoneRaw,
    email: settings.email,
    address: settings.address,
    hours: settings.hours,
    google_reviews_url: settings.googleReviewsUrl,
    taxes_to_go_url: settings.taxesToGoUrl,
  });
  if (error) throw error;
}

// ─── Merged site data ─────────────────────────────────────────────────────────

export async function getMergedSiteData(): Promise<DynamicSiteData> {
  const s = await getSettings();
  const phoneRaw = s.phoneRaw || SITE.phoneRaw;
  const email = s.email || SITE.email;
  const addr = {
    street: s.address?.street || SITE.address.street,
    city: s.address?.city || SITE.address.city,
    state: s.address?.state || SITE.address.state,
    zip: s.address?.zip || SITE.address.zip,
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
      weekdays: s.hours?.weekdays || SITE.hours.weekdays,
      saturday: s.hours?.saturday || SITE.hours.saturday,
      sunday: s.hours?.sunday || SITE.hours.sunday,
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
