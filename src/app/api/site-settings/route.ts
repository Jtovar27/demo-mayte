import { NextResponse } from "next/server";
import { getMergedSiteData } from "@/lib/admin-store";

export async function GET() {
  try {
    const data = await getMergedSiteData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
