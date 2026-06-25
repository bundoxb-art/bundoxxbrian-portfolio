import { NextRequest, NextResponse } from "next/server";

const N8N_URL = "https://bundoxxbee-n8n.onrender.com/webhook/bundoxx-chat";

async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

async function fetchWithTimeoutAndRetries(
  url: string,
  body: unknown,
  opts?: { timeoutMs?: number; retries?: number }
) {
  const timeoutMs = opts?.timeoutMs ?? 25000;
  const maxRetries = opts?.retries ?? 2;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`n8n responded ${res.status}: ${text}`);
      }

      const contentType = res.headers.get("content-type") || "";
      let reply: string;
      if (contentType.includes("application/json")) {
        const data = await res.json();
        reply = data.reply || data.message || data.output || JSON.stringify(data);
      } else {
        reply = await res.text();
      }

      if (!reply || reply.trim() === "") {
        throw new Error("Empty response from n8n");
      }

      return reply.trim();
    } catch (err) {
      clearTimeout(timeout);

      if (err instanceof Error && err.name === "AbortError") {
        // Timeout — treat as a wake-up case (do not retry)
        throw err;
      }

      const isLastAttempt = attempt === maxRetries;
      if (!isLastAttempt) {
        const backoff = 500 * Math.pow(2, attempt);
        await delay(backoff);
        continue;
      }

      throw err;
    }
  }

  throw new Error("Unexpected fetch failure");
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    try {
      const reply = await fetchWithTimeoutAndRetries(N8N_URL, { message }, { timeoutMs: 25000, retries: 2 });
      return NextResponse.json({ reply });
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json({
          reply:
            "🐝 Give me a second — I'm waking up! Please send your message again in a moment. (Our AI takes ~30 seconds to start after being idle)",
        });
      }

      console.error("Chat fetch error:", fetchError);
      throw fetchError;
    }
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({
      reply:
        "Having trouble right now! WhatsApp Brian directly: wa.me/254768771559 🐝",
    });
  }
}