import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import type { PostgrestError } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/env";
import { links, person } from "@/lib/site-content";

type Payload = {
  name: string;
  email: string;
  message: string;
};

function isEmailLike(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactEmailHtml(opts: { name: string; email: string; message: string }) {
  const { name, email, message } = opts;
  const brand = escapeHtml(person.navWordmark);
  const safeName = escapeHtml(name || "—");
  const safeEmail = escapeHtml(email || "—");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const mailto =
    email && isEmailLike(email) ? `mailto:${encodeURIComponent(email)}` : undefined;
  const emailCell = mailto
    ? `<a href="${mailto}" style="color:#111;text-decoration:underline;">${safeEmail}</a>`
    : safeEmail;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.5;color:#18181b;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #e4e4e7;overflow:hidden;">
<tr><td style="padding:28px 28px 8px;font-size:15px;color:#3f3f46;">
<p style="margin:0;">Contact form • <strong style="font-weight:600;color:#18181b;">${brand}</strong></p>
</td></tr>
<tr><td style="padding:8px 28px 24px;font-size:14px;color:#52525b;">
<p style="margin:0 0 16px;">You have a new message from your site.</p>
<div style="padding:16px 18px;background:#fafafa;border-radius:12px;border:1px solid #f4f4f5;font-size:15px;color:#18181b;line-height:1.55;">${safeMessage}</div>
<table role="presentation" style="margin-top:20px;font-size:14px;border-collapse:collapse;">
<tr><td style="padding:6px 16px 6px 0;color:#71717a;vertical-align:top;">Name</td><td style="padding:6px 0;color:#18181b;">${safeName}</td></tr>
<tr><td style="padding:6px 16px 6px 0;color:#71717a;vertical-align:top;">Email</td><td style="padding:6px 0;color:#18181b;">${emailCell}</td></tr>
</table>
<p style="margin:24px 0 0;font-size:12px;color:#a1a1aa;">Reply to this thread to respond directly to the sender when an email was provided.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!message || message.length < 5) {
      return NextResponse.json({ ok: false, error: "Please enter a message." }, { status: 400 });
    }
    if (email && !isEmailLike(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
    const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = requireEnv("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Store message (expects table `contact_messages` with at least: name, email, message).
    // Keep the insert minimal to match the user's current table schema.
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name: name || null,
      email: email || null,
      message,
    });

    if (insertError) {
      const pg = insertError as PostgrestError;
      const details =
        process.env.NODE_ENV !== "production"
          ? { supabase: { message: pg.message, code: pg.code } }
          : undefined;
      return NextResponse.json(
        {
          ok: false,
          error:
            pg.message?.includes('relation "contact_messages" does not exist')
              ? "Contact form database table is missing. Create `contact_messages` in Supabase."
              : "Failed to save message. Please try again.",
          details,
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendKey);
    const toEmail = (process.env.CONTACT_TO_EMAIL?.trim() || links.email.replace("mailto:", "")).trim();
    const subject = name
      ? `Contact form: ${name} · ${person.navWordmark}`
      : `Contact form · ${person.navWordmark}`;

    const text = [
      `Contact form · ${person.navWordmark}`,
      "",
      message,
      "",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
    ].join("\n");

    const html = buildContactEmailHtml({ name, email, message });

    const from = (process.env.RESEND_FROM?.trim() || "Caleb <onboarding@resend.dev>").trim();

    const { error: mailError } = await resend.emails.send({
      from,
      to: [toEmail],
      replyTo: email ? email : undefined,
      subject,
      text,
      html,
    });

    if (mailError) {
      // Saved to DB already; still return ok but report mail issue.
      const details =
        process.env.NODE_ENV !== "production"
          ? { resend: { message: mailError.message, name: (mailError as unknown as { name?: string }).name } }
          : undefined;
      return NextResponse.json(
        {
          ok: true,
          warned: true,
          warning:
            "Saved your message, but email delivery failed. (Tip: verify a sender domain in Resend and set RESEND_FROM.)",
          details,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error. Please try again." }, { status: 500 });
  }
}

