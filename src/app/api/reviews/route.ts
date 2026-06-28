import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const admin = supabaseAdmin;
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await admin
    .from("pf_reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ reviews: data });
}

export async function POST(req: NextRequest) {
  try {
    const { rating, comment, name, email, projectType } =
      await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Invalid rating" },
        { status: 400 }
      );
    }

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const admin = supabaseAdmin;
    if (!admin) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 }
      );
    }

    const { error } = await admin
      .from("pf_reviews")
      .insert({
        rating,
        comment: comment?.trim() || null,
        reviewer_name: name.trim(),
        reviewer_email: email?.trim() || null,
        project_type: projectType || "General",
        approved: false, // needs approval first
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Notify Brian on WhatsApp
    const waText = `⭐ NEW REVIEW SUBMITTED!\n\n👤 ${name}\n🏷️ ${projectType}\n⭐ ${rating}/5\n💬 ${comment || "No comment"}\n\nApprove in Supabase: supabase.com`;
    fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${encodeURIComponent(waText)}&apikey=${process.env.CALLMEBOT_API_KEY}`
    ).catch(console.error);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}