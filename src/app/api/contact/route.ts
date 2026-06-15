import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    // ── Save lead to database ──
    await supabaseAdmin.from("pf_leads").insert({
      name,
      email: email || null,
      subject: subject || null,
      message,
    });

    // ── 1. Notify Brian via WhatsApp (CallMeBot) ──
    const waText = `🐝 NEW LEAD!\n\n👤 ${name}\n✉️ ${email || "Not provided"}\n🏷️ ${subject || "General Inquiry"}\n\n💬 ${message}`;

    const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${encodeURIComponent(
      waText
    )}&apikey=${process.env.CALLMEBOT_API_KEY}`;

    // Fire and forget — don't block response if this fails
    fetch(waUrl).catch((e) => console.error("CallMeBot error:", e));

    // ── 2. Send branded confirmation email to client ──
    if (email) {
      await resend.emails.send({
        from: "BundoxxThe Bee <onboarding@resend.dev>",
        to: email,
        subject: "Thanks for reaching out! 🐝 — BundoxxThe Bee",
        html: `
          <div style="background:#05070d;padding:40px 20px;font-family:Arial,sans-serif;">
            <div style="max-width:480px;margin:0 auto;background:#0d1220;border-radius:16px;padding:32px;border:1px solid rgba(0,245,200,0.2);">
              <h1 style="color:#00f5c8;font-size:24px;letter-spacing:2px;margin:0 0 8px;">BUNDOXX<span style="color:#eef0f6;">BRIAN</span></h1>
              <p style="color:#5a6278;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 24px;">Focused. Fast. Reliable. 🐝</p>
              
              <h2 style="color:#eef0f6;font-size:20px;margin:0 0 12px;">Hi ${name}! 👋</h2>
              <p style="color:#9ba3bb;font-size:14px;line-height:1.7;margin:0 0 16px;">
                Thanks for reaching out! I've received your message and will get back to you within 24 hours.
              </p>
              
              <div style="background:rgba(0,245,200,0.06);border:1px solid rgba(0,245,200,0.15);border-radius:10px;padding:16px;margin:0 0 20px;">
                <p style="color:#5a6278;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Your Message:</p>
                <p style="color:#9ba3bb;font-size:13px;line-height:1.6;margin:0;font-style:italic;">"${message}"</p>
              </div>

              <p style="color:#9ba3bb;font-size:14px;line-height:1.7;margin:0 0 24px;">
                Need a faster response? Message me directly on WhatsApp 👇
              </p>

              <a href="https://wa.me/254768771559" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
                💬 Chat on WhatsApp
              </a>

              <p style="color:#5a6278;font-size:11px;margin:32px 0 0;text-align:center;letter-spacing:1px;">
                BundoxxThe Bee · Mombasa, Kenya 🐝
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try WhatsApp instead." },
      { status: 500 }
    );
  }
}