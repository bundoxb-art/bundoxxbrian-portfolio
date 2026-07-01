import { NextRequest, NextResponse } from "next/server";
import { getMpesaToken, getMpesaBaseUrl, getTimestamp, normalizePhone } from "@/lib/mpesa";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, reference } = await req.json();

    if (!phone || !amount) {
      return NextResponse.json({ error: "Phone and amount are required" }, { status: 400 });
    }

    const numericAmount = Math.round(Number(amount));
    if (!numericAmount || numericAmount < 1) {
      return NextResponse.json({ error: "Enter a valid amount" }, { status: 400 });
    }
    if (numericAmount > 150000) {
      return NextResponse.json({ error: "Amount exceeds M-Pesa limit (KES 150,000)" }, { status: 400 });
    }

    const normalizedPhone = normalizePhone(phone);
    if (!/^254(7|1)\d{8}$/.test(normalizedPhone)) {
      return NextResponse.json({ error: "Enter a valid Safaricom number, e.g. 0712345678" }, { status: 400 });
    }

    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const timestamp = getTimestamp();
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const token = await getMpesaToken();

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: numericAmount,
      PartyA: normalizedPhone,
      PartyB: shortcode,
      PhoneNumber: normalizedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL!,
      AccountReference: reference || process.env.MPESA_ACCOUNT_REFERENCE || "BundoxxBrian",
      TransactionDesc: "Payment to BundoxxThe Bee",
    };

    const res = await fetch(`${getMpesaBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.ResponseCode !== "0") {
      console.error("STK Push failed:", data);
      return NextResponse.json(
        { error: data.errorMessage || data.ResponseDescription || "Failed to initiate payment" },
        { status: 400 }
      );
    }

    await supabaseAdmin.from("pf_payments").insert({
      checkout_request_id: data.CheckoutRequestID,
      merchant_request_id: data.MerchantRequestID,
      phone: normalizedPhone,
      amount: numericAmount,
      account_reference: reference || null,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      checkoutRequestId: data.CheckoutRequestID,
      message: "Check your phone to complete payment",
    });
  } catch (err) {
    console.error("STK Push error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}