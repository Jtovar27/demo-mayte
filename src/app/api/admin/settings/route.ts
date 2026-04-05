import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings, SiteSettings } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to read settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json() as SiteSettings;
    await saveSettings(body);
    revalidatePath("/", "layout"); // revalidate all pages (footer, contact, chatbot use these settings)
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
