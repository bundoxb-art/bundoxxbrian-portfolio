import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectType, budget, timeline, name, phone, email, description } = body;

    if (!name || !phone || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase admin client is not configured" },
        { status: 500 }
      );
    }

    // Save to Supabase
    const { error } = await supabaseAdmin
      .from("pf_inquiries")
      .insert({
        project_type: projectType,
        budget,
        timeline,
        name,
        phone,
        email: email || null,
        description: description || null,
      });

    if (error) throw error;

    // Notify Brian via WhatsApp
    const waText = `🔥 NEW PROJECT INQUIRY!\n\n👤 ${name}\n📱 ${phone}\n${email ? `✉️ ${email}\n` : ""}
🏷️ Project: ${projectType}\n💰 Budget: ${budget}\n⏱️ Timeline: ${timeline}\n${description ? `💬 Details: ${description}` : ""}`;

    fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${encodeURIComponent(waText)}&apikey=${process.env.CALLMEBOT_API_KEY}`
    ).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}