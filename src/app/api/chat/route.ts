import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      return new NextResponse('Webhook not configured', { status: 500 });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const reply = await response.text();
    return new NextResponse(reply, { status: 200 });

  } catch (error) {
    console.error('Chat error:', error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
}