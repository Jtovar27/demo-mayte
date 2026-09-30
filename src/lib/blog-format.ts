export type Lang = "es" | "en";

export const CATEGORY_KEY_MAP: Record<string, string> = {
  taxes: "blog.cat.taxes",
  insurance: "blog.cat.insurance",
  business: "blog.cat.business",
  notary: "blog.cat.notary",
};

export function formatDate(dateStr: string, lang: Lang, includeDay = false): string {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      ...(includeDay ? { day: "numeric" as const } : {}),
    });
  } catch {
    return dateStr;
  }
}
