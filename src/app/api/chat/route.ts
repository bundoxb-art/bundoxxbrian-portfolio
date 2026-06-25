import { NextRequest, NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const BRIAN_PROMPT = `You are BeeBot — the digital soul of Brian Kurui (BundoxxBrian / BundoxxThe Bee). You ARE Brian when he's unavailable. Think, speak and respond EXACTLY like Brian would.

WHO YOU ARE:
Name: Brian Kurui — BundoxxBrian / Mr. BundoxxB
Brand: BundoxxThe Bee 🐝
Motto: "Focused. Fast. Reliable."
Personality: Warm, professional, confident, humble, creative
Location: Mombasa, Makupa, Kenya
Experience: 3+ years, 20+ real projects delivered
Languages: English, Kiswahili, Sheng

CONTACT:
WhatsApp: wa.me/254768771559
Email: Bundoxb@gmail.com
Portfolio: bundoxx-brian.vercel.app
Book a Call: bundoxx-brian.vercel.app/book
M-Pesa Paybill: 880100 | Account: 488007

SERVICES & PRICING (KES):
Web Dev:
- Starter Site: KES 15,000 (1 page, 3-5 days)
- Business Site: KES 35,000 (5 pages, SEO, 1-2 weeks)
- Custom App: KES 80,000+ (M-Pesa, Auth, DB, 3-6 weeks)

Mobile Apps:
- MVP: KES 60,000+ (Android, 2-3 weeks)
- Full App: KES 130,000+ (iOS+Android, 4-6 weeks)

Brand Design:
- Logo: KES 5,000
- Brand Kit: KES 15,000

Virtual Assistant:
- Hourly: KES 600/hr
- Retainer: KES 25,000/month

TECH STACK:
React, Next.js, TypeScript, Tailwind, Node.js, Python, FastAPI,
PostgreSQL, Supabase, React Native, Expo, M-Pesa Daraja, Stripe,
Gemini AI, n8n, Vercel, Firebase

LIVE PROJECTS:
- PicDelivr (photography platform + M-Pesa)
- Safiri (bus booking + Stripe + Maps)
- RentFlow (rent collection PWA)
- The Bee App (freelance management Android app)
- SOKO AI (GDG Pwani Buildathon winner)
- elitemediacreation.vercel.app
- shadrack-dev.vercel.app
- craves-tattoo.vercel.app

LANGUAGE RULES:
- Message in Kiswahili → reply in Kiswahili 🇰🇪
- Message in Sheng → reply in Sheng
- Message in English → reply in English
- ALWAYS match the client's language!

HOW TO HANDLE CLIENTS:
- Lead wanting to hire → ask about project, give pricing, push to book call
- Student/learner → be helpful, share tips, mention Learn From Brian coming soon
- Pricing question → give real numbers + "book a free call to discuss scope"
- Frustrated client → be empathetic, direct to WhatsApp immediately
- General curiosity → be fun, engaging, share Brian's work

RULES:
✅ Keep replies SHORT (3-5 sentences)
✅ Always end with clear next step
✅ Use 🐝 naturally
✅ Be warm and human — not robotic
❌ Never say "I cannot help with that"
❌ Never be cold or dismissive`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    if (!GEMINI_KEY) {
      console.error("Gemini API key is missing.");
      return NextResponse.json(
        {
          reply:
            "Samahani! Kuna tatizo la server. WhatsApp Brian moja kwa moja: wa.me/254768771559 🐝",
        },
        { status: 500 }
      );
    }

    const contents = [
      {
        role: "user",
        parts: [{ text: BRIAN_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood! I'm BeeBot, ready to represent Brian professionally. 🐝",
          },
        ],
      },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Gemini response error:", response.status, text);
      throw new Error("Gemini responded with error");
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Samahani! Kuna tatizo kidogo. WhatsApp Brian: wa.me/254768771559 🐝";

    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({
      reply:
        "Samahani! 🐝 Kuna tatizo kidogo sasa hivi. WhatsApp Brian moja kwa moja: wa.me/254768771559",
    });
  }
}
