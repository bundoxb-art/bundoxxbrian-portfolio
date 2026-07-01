import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const checkoutRequestId = req.nextUrl.searchParams.get("checkoutRequestId");

  if (!checkoutRequestId) {
    return NextResponse.json({ error: "Missing checkoutRequestId" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("pf_payments")
    .select("status, mpesa_receipt_number, result_desc")
    .eq("checkout_request_id", checkoutRequestId)
    .single();

  if (error || !data) {
    return NextResponse.json({ status: "pending" });
  }

  return NextResponse.json(data);
}