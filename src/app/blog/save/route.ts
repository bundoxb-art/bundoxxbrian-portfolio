import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const {
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      published,
      published_at,
    } = await req.json();

    if (id) {
      // Update existing
      const { error } = await adminClient
        .from("posts")
        .update({
          title,
          slug,
          excerpt,
          content,
          cover_image_url,
          published,
          published_at,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
    } else {
      // Create new
      const { error } = await adminClient
        .from("posts")
        .insert({
          title,
          slug,
          excerpt,
          content,
          cover_image_url,
          published,
          published_at,
        });

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Blog save error:", err);
    return NextResponse.json(
      { error: "Failed to save post" },
      { status: 500 }
    );
  }
}