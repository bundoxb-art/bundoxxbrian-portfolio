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
      project_name,
      description,
      tech_stack,
      progress,
    } = await req.json();

    if (id) {
      await adminClient
        .from("pf_current_project")
        .update({
          project_name,
          description,
          tech_stack,
          progress,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    } else {
      await adminClient.from("pf_current_project").insert({
        project_name,
        description,
        tech_stack,
        progress,
        is_active: true,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}