import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Save subscriber (skip if already subscribed)
    await supabaseAdmin
      .from("pf_subscribers")
      .upsert({ email, source: "tech_guide" }, { onConflict: "email", ignoreDuplicates: true });

    // Notify Brian
    const waText = `🐝 New Dev Guide subscriber!\n\n✉️ ${email}`;
    const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${encodeURIComponent(waText)}&apikey=${process.env.CALLMEBOT_API_KEY}`;
    fetch(waUrl).catch((e) => console.error("CallMeBot error:", e));

    // Send the guide
    await resend.emails.send({
      from: "BundoxxThe Bee <onboarding@resend.dev>",
      to: email,
      subject: "🐝 Your Free Dev Resource Guide — BundoxxThe Bee",
      html: `
        <div style="background:#05070d;padding:40px 20px;font-family:Arial,sans-serif;">
          <div style="max-width:480px;margin:0 auto;background:#0d1220;border-radius:16px;padding:32px;border:1px solid rgba(0,245,200,0.2);">
            <h1 style="color:#00f5c8;font-size:24px;letter-spacing:2px;margin:0 0 8px;">BUNDOXX<span style="color:#eef0f6;">BRIAN</span></h1>
            <p style="color:#5a6278;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 24px;">Focused. Fast. Reliable. 🐝</p>

            <h2 style="color:#eef0f6;font-size:20px;margin:0 0 12px;">Here's your Dev Resource Guide 🚀</h2>
            <p style="color:#9ba3bb;font-size:14px;line-height:1.7;margin:0 0 20px;">
              These are the exact free resources I used to learn my stack. Bookmark this email!
            </p>

            <div style="background:rgba(0,245,200,0.06);border:1px solid rgba(0,245,200,0.15);border-radius:10px;padding:18px;margin:0 0 20px;">
              <p style="color:#00f5c8;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px;">🎨 Frontend</p>
              <p style="color:#9ba3bb;font-size:13px;line-height:2;margin:0 0 16px;">
                <a href="https://react.dev/learn" style="color:#eef0f6;">→ React — react.dev/learn</a><br/>
                <a href="https://nextjs.org/learn" style="color:#eef0f6;">→ Next.js — nextjs.org/learn</a><br/>
                <a href="https://www.typescriptlang.org/docs/" style="color:#eef0f6;">→ TypeScript — typescriptlang.org/docs</a><br/>
                <a href="https://tailwindcss.com/docs" style="color:#eef0f6;">→ Tailwind CSS — tailwindcss.com/docs</a>
              </p>

              <p style="color:#00f5c8;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px;">⚙️ Backend</p>
              <p style="color:#9ba3bb;font-size:13px;line-height:2;margin:0 0 16px;">
                <a href="https://nodejs.org/en/learn" style="color:#eef0f6;">→ Node.js — nodejs.org/en/learn</a><br/>
                <a href="https://docs.python.org/3/tutorial/" style="color:#eef0f6;">→ Python — docs.python.org/3/tutorial</a>
              </p>

              <p style="color:#00f5c8;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px;">📱 Mobile</p>
              <p style="color:#9ba3bb;font-size:13px;line-height:2;margin:0 0 16px;">
                <a href="https://reactnative.dev/docs/getting-started" style="color:#eef0f6;">→ React Native — reactnative.dev</a>
              </p>

              <p style="color:#00f5c8;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin:0 0 10px;">🔧 Tools</p>
              <p style="color:#9ba3bb;font-size:13px;line-height:2;margin:0;">
                <a href="https://learngitbranching.js.org" style="color:#eef0f6;">→ Git & GitHub — learngitbranching.js.org</a>
              </p>
            </div>

            <p style="color:#9ba3bb;font-size:14px;line-height:1.7;margin:0 0 20px;">
              🎓 <strong style="color:#f5c842;">Coming soon:</strong> "Learn From BundoxxBriaN" — my own structured courses on this exact stack. You'll be first to know! 🐝
            </p>

            <a href="https://wa.me/254768771559" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
              💬 Got Questions? Chat on WhatsApp
            </a>

            <p style="color:#5a6278;font-size:11px;margin:32px 0 0;text-align:center;letter-spacing:1px;">
              BundoxxThe Bee · Mombasa, Kenya 🐝
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Tech guide API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}