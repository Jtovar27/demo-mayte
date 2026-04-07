import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  advisor?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  if (isRateLimited(getClientIp(req), { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { name, phone, email, service, advisor, message } = body;

  if (!name || !phone || !service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    phone,
    email: email || null,
    service,
    advisor: advisor || null,
    message: message || null,
  });

  if (error) {
    console.error("[/api/contact] Supabase error:", error);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
