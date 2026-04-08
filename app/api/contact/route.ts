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
    const toEmail = links.email.replace("mailto:", "");
    const subject = `New message via ${person.navWordmark} site${name ? ` — ${name}` : ""}`;

    const text = [
      "New website message",
      "",
      message,
      "",
      "—",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
    ].join("\n");

    const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

    const { error: mailError } = await resend.emails.send({
      from,
      to: [toEmail],
      replyTo: email ? email : undefined,
      subject,
      text,
    });

    if (mailError) {
      // Saved to DB already; still return ok but report mail issue.
      return NextResponse.json(
        { ok: true, warned: true, warning: "Saved your message, but email delivery failed." },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error. Please try again." }, { status: 500 });
  }
}

