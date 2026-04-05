import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getMergedSiteData } from "@/lib/admin-store";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function buildSystemPrompt(s: Awaited<ReturnType<typeof getMergedSiteData>>): string {
  return `You are a concise, friendly virtual assistant for ${s.name} — a tax, insurance, notary, and business services office located at ${s.address.full}, Kissimmee, Florida. The owner is ${s.owner}.

## YOUR ROLE
Answer ONLY questions about the services and information listed below. If the user asks about anything outside this scope, politely say you can only help with topics related to the office and invite them to call.

## RESPONSE RULES
- Keep responses SHORT: 2–4 short paragraphs or a brief bullet list maximum.
- Respond in the SAME LANGUAGE the user writes in (Spanish or English).
- NEVER invent prices, timelines, or guarantees not listed here.
- End with a contact prompt only when clearly relevant.

## CONTACT
Phone / WhatsApp: ${s.phone}
Email: ${s.email}
Address: ${s.address.full}
Hours: Mon–Fri 9am–6pm | Saturdays by appointment | Sundays closed

## SERVICES

### Taxes
- Personal tax returns (W-2, 1099 — ITIN holders welcome)
- Business tax returns
- ITIN applications (for those without a Social Security Number)
- Federal deadline: April 15; 6-month extensions available (payment still due April 15 if owed)
- Documents needed: W-2 or 1099, SSN or ITIN, bank account info, deductible receipts

### Insurance
- Health insurance / Obamacare (ACA): most US residents qualify; subsidies based on income
- Life insurance
- Medicare (age 65+ or disabled) and Medicaid (low-income, any age)
- We compare plans, calculate subsidies, and handle enrollment

### Notary & Documents (document preparation only — NOT legal services)
- Notary Public: official document authentication
- Apostilles: international document legalization (birth certificates, diplomas, powers of attorney)
- Powers of Attorney (general and specific)
- Certificate of Life (Fe de Vida)
- Certified Translations: Spanish, English, Portuguese, French, Italian — accepted by consulates and courts
- Immigration Document Assistance: administrative document prep ONLY (not legal advice; we are not attorneys or accredited representatives)

### Business & Credit
- LLC / Corporation registration in Florida (state fee: $125)
- EIN application with the IRS (free)
- Business credit establishment and business profile for financing access
- Short and long-term loans
- Credit repair (administrative credit dispute process)

### Taxes To Go
- Mobile / remote tax filing service
- Download / more info: ${s.taxesToGo.url}

## PRICING
- Initial consultation is FREE and no-obligation
- Prices vary by service complexity — we always provide a clear quote upfront, no surprises

## FAQ
- Tax deadline? April 15. Extensions available. If you owe, payment is still due April 15.
- File without SSN? Yes, with an ITIN. We help you apply.
- Obamacare? Federal health plan. Most US residents qualify. Subsidies based on income.
- Medicare vs Medicaid? Medicare = 65+ or disabled. Medicaid = low-income, any age.
- What is an apostille? Official seal that authenticates documents for use in other countries.
- LLC cost in Florida? $125 state fee. Contact us for our service fee.
- Need an EIN? Yes if you have employees, operate as LLC/corp, or need a business bank account. We apply for free.
- Certified translation languages? Spanish, English, Portuguese, French, Italian (5+).

## OUT OF SCOPE — always redirect to a licensed attorney
If asked about: green cards, naturalization, citizenship, asylum, refugee status, deportation, removal proceedings, or any USCIS petitions (I-485, I-130, I-90, etc.) — respond that this requires a licensed immigration attorney and that the office only handles administrative document preparation. Do NOT attempt to answer.`;
}

export async function POST(req: NextRequest) {
  // Rate limit: max 20 messages per IP per minute
  if (isRateLimited(getClientIp(req), { limit: 20, windowMs: 60 * 1000 })) {
    return new Response("Too many requests. Please try again later.", { status: 429 });
  }

  let messages: { role: string; content: string }[];
  let siteData: Awaited<ReturnType<typeof getMergedSiteData>>;

  try {
    const body = await req.json() as { messages?: unknown };
    messages = Array.isArray(body.messages) ? (body.messages as { role: string; content: string }[]) : [];
    siteData = await getMergedSiteData();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const SYSTEM_PROMPT = buildSystemPrompt(siteData);

  // Keep only real user/assistant turns (skip empty welcome message) and last 6 to limit tokens
  const filtered = messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content.trim().length > 0)
    .slice(-6);

  // Anthropic API requires the conversation to start with a user message
  const firstUserIdx = filtered.findIndex((m) => m.role === "user");
  if (firstUserIdx === -1) {
    return new Response("No user message found", { status: 400 });
  }
  const apiMessages = filtered.slice(firstUserIdx) as Anthropic.MessageParam[];

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[/api/chat] ANTHROPIC_API_KEY is not set");
    return new Response("Service unavailable", { status: 503 });
  }

  try {
    const stream = client.messages.stream({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: apiMessages,
    });

    // Wait for the initial connection to verify the API call succeeds
    // before returning a 200 response, so we can return a proper error status
    let firstChunkReceived = false;

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              firstChunkReceived = true;
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (streamErr) {
          console.error("[/api/chat] Stream error:", streamErr);
          if (!firstChunkReceived) {
            controller.enqueue(encoder.encode("\x00ERROR"));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[/api/chat] Error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
