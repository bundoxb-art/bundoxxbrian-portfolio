import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    const n8nResponse = await fetch(
      'https://bundoxxbee-n8n.onrender.com/webhook/bundoxx-chat',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      }
    );

    const data = await n8nResponse.json();
    return NextResponse.json({ reply: data.reply || data.message || 'Thanks for reaching out! Brian will respond soon. 🐝' });

  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({
      reply: 'Having trouble connecting right now! WhatsApp Brian directly: wa.me/254768771559 🐝',
    });
  }
}