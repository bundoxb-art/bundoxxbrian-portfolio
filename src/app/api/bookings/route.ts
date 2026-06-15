import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, projectType, bookingDate, bookingTime, details } = await req.json();

    if (!name || !bookingDate || !bookingTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("pf_bookings").insert({
      name,
      email: email || null,
      phone: phone || null,
      project_type: projectType || null,
      booking_date: bookingDate,
      booking_time: bookingTime,
      details: details || null,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}