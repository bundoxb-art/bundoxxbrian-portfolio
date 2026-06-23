import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    const n8nResponse = await fetch(
      "https://bundoxxbee-n8n.onrender.com/webhook/bundoxx-chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }
    );

    // Handle BOTH plain text AND JSON responses from n8n
    const contentType = n8nResponse.headers.get("content-type") || "";
    let reply: string;

    if (contentType.includes("application/json")) {
      const data = await n8nResponse.json();
      reply = data.reply || data.message || data.output || JSON.stringify(data);
    } else {
      // n8n returned plain text — use it directly!
      reply = await n8nResponse.text();
    }

    // Always return proper JSON to the widget
    return NextResponse.json({ reply });

  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({
      reply:
        "Having trouble right now! WhatsApp Brian directly: wa.me/254768771559 🐝",
    });
  }
}