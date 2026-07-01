import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const callback = body?.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const checkoutRequestId = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc;

    let mpesaReceiptNumber: string | null = null;
    if (resultCode === 0 && callback.CallbackMetadata?.Item) {
      const items = callback.CallbackMetadata.Item;
      const receiptItem = items.find((i: { Name: string }) => i.Name === "MpesaReceiptNumber");
      mpesaReceiptNumber = receiptItem?.Value || null;
    }

    await supabaseAdmin
      .from("pf_payments")
      .update({
        status: resultCode === 0 ? "success" : "failed",
        result_desc: resultDesc,
        mpesa_receipt_number: mpesaReceiptNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("checkout_request_id", checkoutRequestId);

    if (resultCode === 0) {
      const waText = `Payment received! Receipt: ${mpesaReceiptNumber}. Check Supabase pf_payments for full details.`;
      fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLMEBOT_PHONE}&text=${encodeURIComponent(waText)}&apikey=${process.env.CALLMEBOT_API_KEY}`
      ).catch(console.error);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("M-Pesa callback error:", err);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}