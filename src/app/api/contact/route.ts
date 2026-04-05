import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getMergedSiteData } from "@/lib/admin-store";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  advisor?: string;
  message?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // Rate limit: max 5 submissions per IP per 10 minutes
  if (isRateLimited(getClientIp(req), { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body: ContactPayload = await req.json();
  const { name, phone, email, service, advisor, message } = body;

  if (!name || !phone || !service) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const siteData = await getMergedSiteData();
  const to = process.env.CONTACT_EMAIL ?? siteData.email;

  const eName = escapeHtml(name);
  const ePhone = escapeHtml(phone);
  const eEmail = email ? escapeHtml(email) : "";
  const eService = escapeHtml(service);
  const eAdvisor = advisor ? escapeHtml(advisor) : "";
  const eMessage = message ? escapeHtml(message) : "";

  const { error } = await resend.emails.send({
    from: "Taxes & Insurance Group LLC <onboarding@resend.dev>",
    to,
    replyTo: email || undefined,
    subject: `Nuevo contacto: ${eName} — ${eService}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1C1C1C">
        <div style="background:#1C1C1C;padding:24px 32px">
          <h1 style="color:#B9954F;font-size:20px;margin:0">Taxes &amp; Insurance Group LLC</h1>
          <p style="color:#888;font-size:13px;margin:6px 0 0">Nuevo mensaje del formulario de contacto</p>
        </div>
        <div style="padding:32px;background:#FAFAFA;border:1px solid #E4E4E4;border-top:none">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:10px 0;color:#6E6E6E;width:140px;vertical-align:top">Nombre</td>
              <td style="padding:10px 0;font-weight:600">${eName}</td>
            </tr>
            <tr style="border-top:1px solid #EBEBEB">
              <td style="padding:10px 0;color:#6E6E6E;vertical-align:top">Teléfono</td>
              <td style="padding:10px 0;font-weight:600">${ePhone}</td>
            </tr>
            ${eEmail ? `
            <tr style="border-top:1px solid #EBEBEB">
              <td style="padding:10px 0;color:#6E6E6E;vertical-align:top">Email</td>
              <td style="padding:10px 0;font-weight:600">${eEmail}</td>
            </tr>` : ""}
            <tr style="border-top:1px solid #EBEBEB">
              <td style="padding:10px 0;color:#6E6E6E;vertical-align:top">Servicio</td>
              <td style="padding:10px 0;font-weight:600">${eService}</td>
            </tr>
            ${eAdvisor ? `
            <tr style="border-top:1px solid #EBEBEB">
              <td style="padding:10px 0;color:#6E6E6E;vertical-align:top">Asesor preferido</td>
              <td style="padding:10px 0;font-weight:600">${eAdvisor}</td>
            </tr>` : ""}
            ${eMessage ? `
            <tr style="border-top:1px solid #EBEBEB">
              <td style="padding:10px 0;color:#6E6E6E;vertical-align:top">Mensaje</td>
              <td style="padding:10px 0">${eMessage}</td>
            </tr>` : ""}
          </table>
        </div>
        <div style="padding:16px 32px;background:#F5F5F5;border:1px solid #E4E4E4;border-top:none">
          <p style="font-size:11px;color:#AFAFAF;margin:0">
            Enviado desde el formulario web de ${siteData.name} · ${siteData.address.full}
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[/api/contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
