import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { clientId, status, notes } = await req.json();

    const { error } = await adminClient
      .from("pf_clients")
      .update({
        status,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", clientId);

    if (error) throw error;

    // Notify client via WhatsApp if we have their phone
    // (Optional — add phone field to clients table if needed)

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}