"use client";

import { useState } from "react";

interface FormData {
  clientName: string;
  clientEmail: string;
  projectName: string;
  projectScope: string;
  totalAmount: string;
  depositAmount: string;
  startDate: string;
  deliveryDate: string;
  invoiceNumber: string;
  services: { description: string; amount: string }[];
}

export default function ContractInvoice() {
  const [form, setForm] = useState<FormData>({
    clientName: "",
    clientEmail: "",
    projectName: "",
    projectScope: "",
    totalAmount: "",
    depositAmount: "",
    startDate: "",
    deliveryDate: "",
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    services: [{ description: "", amount: "" }],
  });

  const [generating, setGenerating] = useState(false);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateService(
    i: number,
    field: "description" | "amount",
    value: string
  ) {
    setForm((prev) => {
      const services = [...prev.services];
      services[i] = { ...services[i], [field]: value };
      return { ...prev, services };
    });
  }

  function addService() {
    setForm((prev) => ({
      ...prev,
      services: [...prev.services, { description: "", amount: "" }],
    }));
  }

  async function generateContract() {
    setGenerating(true);
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString("en-KE", {
      year: "numeric", month: "long", day: "numeric",
    });

    // Header
    doc.setFillColor(5, 7, 13);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(0, 245, 200);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BUNDOXXBRIAN", 20, 18);
    doc.setTextColor(238, 240, 246);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Full-Stack Developer · Brand Designer · VA", 20, 26);
    doc.text("Mombasa, Makupa, Kenya | Bundoxb@gmail.com | wa.me/254768771559", 20, 33);

    // Title
    doc.setTextColor(5, 7, 13);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("PROJECT CONTRACT", 20, 55);
    doc.setDrawColor(0, 245, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 58, 190, 58);

    // Date & Parties
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`Date: ${today}`, 20, 68);
    doc.text(`Contract #: CNT-${form.invoiceNumber.replace("INV-", "")}`, 20, 75);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 7, 13);
    doc.text("BETWEEN:", 20, 88);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text("Service Provider: Brian Kurui (BundoxxBrian)", 20, 96);
    doc.text("Location: Mombasa, Makupa, Kenya", 20, 103);
    doc.text("Contact: Bundoxb@gmail.com | +254 768 771 559", 20, 110);

    doc.text(`Client: ${form.clientName}`, 20, 122);
    doc.text(`Email: ${form.clientEmail}`, 20, 129);

    // Project Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 7, 13);
    doc.text("PROJECT DETAILS", 20, 145);
    doc.line(20, 148, 190, 148);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(`Project Name: ${form.projectName}`, 20, 158);
    doc.text(`Start Date: ${form.startDate}`, 20, 165);
    doc.text(`Estimated Delivery: ${form.deliveryDate}`, 20, 172);

    doc.setFont("helvetica", "bold");
    doc.text("Project Scope:", 20, 182);
    doc.setFont("helvetica", "normal");
    const scopeLines = doc.splitTextToSize(form.projectScope, 170);
    doc.text(scopeLines, 20, 190);

    // Payment Terms
    const scopeHeight = Math.min(scopeLines.length * 7, 40);
    let y = 195 + scopeHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 7, 13);
    doc.text("PAYMENT TERMS", 20, y);
    doc.line(20, y + 3, 190, y + 3);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(`Total Project Amount: KES ${Number(form.totalAmount).toLocaleString("en-KE")}`, 20, y + 13);
    doc.text(`Deposit Required (50%): KES ${Number(form.depositAmount).toLocaleString("en-KE")}`, 20, y + 20);
    doc.text(`Balance Due on Delivery: KES ${(Number(form.totalAmount) - Number(form.depositAmount)).toLocaleString("en-KE")}`, 20, y + 27);
    doc.text("Payment Method: M-Pesa Paybill 880100, Account 488007", 20, y + 34);

    // Terms
    y += 50;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 7, 13);
    doc.text("TERMS & CONDITIONS", 20, y);
    doc.line(20, y + 3, 190, y + 3);

    const terms = [
      "1. Work begins only after deposit payment is confirmed.",
      "2. Revisions: Up to 3 rounds of revisions included.",
      "3. Balance due upon project completion before final delivery.",
      "4. Intellectual property transfers to client upon full payment.",
      "5. Source code delivered within 7 days of final payment.",
      "6. Additional features not in scope will be quoted separately.",
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    terms.forEach((term, i) => {
      doc.text(term, 20, y + 13 + i * 8);
    });

    // Signatures
    y += 70;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 7, 13);
    doc.text("SIGNATURES", 20, y + 30);
    doc.line(20, y + 33, 190, y + 33);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Service Provider: Brian Kurui", 20, y + 48);
    doc.line(20, y + 60, 85, y + 60);
    doc.text("Signature & Date", 20, y + 65);

    doc.text(`Client: ${form.clientName}`, 110, y + 48);
    doc.line(110, y + 60, 190, y + 60);
    doc.text("Signature & Date", 110, y + 65);

    // Footer
    doc.setFillColor(5, 7, 13);
    doc.rect(0, 282, 210, 15, "F");
    doc.setTextColor(0, 245, 200);
    doc.setFontSize(8);
    doc.text("BundoxxThe Bee 🐝 · Focused. Fast. Reliable. · bundoxx-brian.vercel.app", 20, 291);

    doc.save(`Contract_${form.clientName.replace(/ /g, "_")}_${form.projectName.replace(/ /g, "_")}.pdf`);
    setGenerating(false);
  }

  async function generateInvoice() {
    setGenerating(true);
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString("en-KE", {
      year: "numeric", month: "long", day: "numeric",
    });

    // Header
    doc.setFillColor(5, 7, 13);
    doc.rect(0, 0, 210, 45, "F");
    doc.setTextColor(0, 245, 200);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, 20);
    doc.setTextColor(238, 240, 246);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("BUNDOXXBRIAN", 20, 30);
    doc.text("Mombasa, Kenya | Bundoxb@gmail.com | +254 768 771 559", 20, 37);

    // Invoice Number
    doc.setTextColor(0, 245, 200);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(form.invoiceNumber, 155, 20);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 200, 200);
    doc.text(`Date: ${today}`, 155, 28);
    doc.text(`Due: On delivery`, 155, 35);

    // Bill To
    doc.setTextColor(5, 7, 13);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(form.clientName, 20, 68);
    doc.text(form.clientEmail, 20, 75);

    // Project
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(5, 7, 13);
    doc.text("PROJECT:", 120, 60);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(form.projectName, 120, 68);
    doc.text(`Start: ${form.startDate}`, 120, 75);
    doc.text(`Delivery: ${form.deliveryDate}`, 120, 82);

    // Itemized Table
    doc.setDrawColor(0, 245, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 95, 190, 95);

    doc.setFillColor(5, 7, 13);
    doc.rect(20, 96, 170, 10, "F");
    doc.setTextColor(0, 245, 200);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("DESCRIPTION", 25, 103);
    doc.text("AMOUNT (KES)", 155, 103);

    let y = 115;
    let total = 0;

    form.services.forEach((service) => {
      if (!service.description) return;
      const amount = Number(service.amount) || 0;
      total += amount;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      doc.text(service.description, 25, y);
      doc.text(amount.toLocaleString("en-KE"), 155, y);
      doc.setDrawColor(220, 220, 220);
      doc.line(20, y + 4, 190, y + 4);
      y += 12;
    });

    // Totals
    y += 5;
    doc.setDrawColor(0, 245, 200);
    doc.line(120, y, 190, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text("Subtotal:", 120, y);
    doc.text(`KES ${total.toLocaleString("en-KE")}`, 155, y);
    y += 8;
    doc.text("Deposit Paid:", 120, y);
    doc.text(`KES ${Number(form.depositAmount).toLocaleString("en-KE")}`, 155, y);
    y += 8;

    doc.setFillColor(5, 7, 13);
    doc.rect(120, y, 70, 10, "F");
    doc.setTextColor(0, 245, 200);
    doc.setFont("helvetica", "bold");
    doc.text("BALANCE DUE:", 122, y + 7);
    doc.text(`KES ${(total - Number(form.depositAmount)).toLocaleString("en-KE")}`, 155, y + 7);
    y += 20;

    // Payment Instructions
    doc.setFillColor(240, 248, 245);
    doc.rect(20, y, 170, 40, "F");
    doc.setTextColor(5, 7, 13);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("HOW TO PAY — M-PESA", 25, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text("1. Open M-Pesa on your phone", 25, y + 18);
    doc.text("2. Select Lipa na M-Pesa → Pay Bill", 25, y + 25);
    doc.text("3. Business No: 880100", 25, y + 32);
    doc.text("4. Account No: 488007", 110, y + 18);
    doc.text("5. Enter the balance amount above", 110, y + 25);
    doc.text("6. Send screenshot to +254 768 771 559", 110, y + 32);

    y += 55;

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your business! 🐝", 20, y);
    doc.text("Focused. Fast. Reliable. — BundoxxThe Bee", 20, y + 7);

    doc.setFillColor(5, 7, 13);
    doc.rect(0, 282, 210, 15, "F");
    doc.setTextColor(0, 245, 200);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("BundoxxThe Bee 🐝 · bundoxx-brian.vercel.app · Mombasa, Kenya", 20, 291);

    doc.save(`Invoice_${form.invoiceNumber}_${form.clientName.replace(/ /g, "_")}.pdf`);
    setGenerating(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#eef0f6",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.85rem",
    padding: "0.72rem 0.9rem",
    borderRadius: "10px",
    outline: "none",
    minHeight: "44px",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.63rem",
    color: "#5a6278",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <section
      id="contracts"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#090c14",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#00f5c8", marginBottom: "0.5rem" }}>
          <span style={{ width: "20px", height: "1px", background: "#00f5c8", display: "inline-block" }} />
          Admin Tools
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "0.04em", lineHeight: "1", marginBottom: "0.6rem", color: "#eef0f6" }}>
          Contract & Invoice
        </h2>
        <p style={{ fontSize: "0.92rem", color: "#9ba3bb", lineHeight: "1.7", marginBottom: "2rem", maxWidth: "500px" }}>
          Generate professional PDFs instantly — no backend needed. 🐝
        </p>

        <div style={{ background: "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))", border: "1px solid rgba(0,245,200,0.2)", borderRadius: "20px", padding: "2rem" }}>
          {/* CLIENT INFO */}
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#eef0f6", marginBottom: "1rem", letterSpacing: "0.05em" }}>Client Info</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem", marginBottom: "1.5rem" }} className="form-row-2">
            <div>
              <label style={labelStyle}>Client Name *</label>
              <input value={form.clientName} onChange={(e) => update("clientName", e.target.value)} placeholder="Jane Smith" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
            <div>
              <label style={labelStyle}>Client Email *</label>
              <input value={form.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} placeholder="jane@email.com" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
          </div>

          {/* PROJECT INFO */}
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#eef0f6", marginBottom: "1rem", letterSpacing: "0.05em" }}>Project Details</h3>
          <div style={{ marginBottom: "0.9rem" }}>
            <label style={labelStyle}>Project Name *</label>
            <input value={form.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="Business Website" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
          </div>
          <div style={{ marginBottom: "0.9rem" }}>
            <label style={labelStyle}>Project Scope *</label>
            <textarea value={form.projectScope} onChange={(e) => update("projectScope", e.target.value)} placeholder="Describe what will be built..." rows={3} style={{ ...inputStyle, resize: "none" }} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem", marginBottom: "0.9rem" }} className="form-row-2">
            <div>
              <label style={labelStyle}>Start Date</label>
              <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} style={{ ...inputStyle, colorScheme: "dark" }} />
            </div>
            <div>
              <label style={labelStyle}>Delivery Date</label>
              <input type="date" value={form.deliveryDate} onChange={(e) => update("deliveryDate", e.target.value)} style={{ ...inputStyle, colorScheme: "dark" }} />
            </div>
          </div>

          {/* PAYMENT */}
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#eef0f6", marginBottom: "1rem", letterSpacing: "0.05em" }}>Payment</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.9rem", marginBottom: "0.9rem" }}>
            <div>
              <label style={labelStyle}>Invoice Number</label>
              <input value={form.invoiceNumber} onChange={(e) => update("invoiceNumber", e.target.value)} style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
            <div>
              <label style={labelStyle}>Total Amount (KES)</label>
              <input type="number" value={form.totalAmount} onChange={(e) => update("totalAmount", e.target.value)} placeholder="35000" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
            <div>
              <label style={labelStyle}>Deposit Amount (KES)</label>
              <input type="number" value={form.depositAmount} onChange={(e) => update("depositAmount", e.target.value)} placeholder="17500" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
          </div>

          {/* SERVICES */}
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#eef0f6", marginBottom: "1rem", letterSpacing: "0.05em" }}>Invoice Line Items</h3>
          {form.services.map((s, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.8rem", marginBottom: "0.6rem" }} className="form-row-2">
              <input value={s.description} onChange={(e) => updateService(i, "description", e.target.value)} placeholder={`Service ${i + 1} (e.g. Web Development)`} style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
              <input type="number" value={s.amount} onChange={(e) => updateService(i, "amount", e.target.value)} placeholder="KES" style={{ ...inputStyle, width: "120px" }} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
          ))}
          <button onClick={addService} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#00f5c8", background: "rgba(0,245,200,0.06)", border: "1px solid rgba(0,245,200,0.2)", padding: "0.4rem 1rem", borderRadius: "50px", cursor: "pointer", marginBottom: "1.5rem" }}>
            + Add Line Item
          </button>

          {/* DOWNLOAD BUTTONS */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={generateContract} disabled={generating} style={{ background: "linear-gradient(135deg, #00f5c8, #00c4a0)", color: "#05070d", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem 1.8rem", borderRadius: "50px", cursor: generating ? "not-allowed" : "pointer", fontWeight: "700", opacity: generating ? 0.6 : 1 }}>
              📄 Download Contract PDF
            </button>
            <button onClick={generateInvoice} disabled={generating} style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", color: "#fff", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.9rem 1.8rem", borderRadius: "50px", cursor: generating ? "not-allowed" : "pointer", fontWeight: "700", opacity: generating ? 0.6 : 1 }}>
              🧾 Download Invoice PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}