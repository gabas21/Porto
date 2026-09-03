import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, serviceType, message, honeypot } = body;

    // 1. Anti-spam honeypot check (hidden field filled by bots)
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json({ success: true, message: "Delivered" }, { status: 200 });
    }

    // 2. Input validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Nama pengirim wajib diisi." },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== "string" || !contact.trim()) {
      return NextResponse.json(
        { success: false, error: "Informasi kontak / email / WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Isi pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanContact = contact.trim();
    const cleanTopic = (serviceType || "Inquiry Umum").trim();
    const cleanMessage = message.trim();
    const targetEmail = process.env.CONTACT_TO_EMAIL || "bagasa020@gmail.com";

    // 3. Option A: Resend API Integration
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Bagas Portfolio <onboarding@resend.dev>",
          to: [targetEmail],
          reply_to: cleanContact.includes("@") ? cleanContact : undefined,
          subject: `[Portfolio Inquiry] ${cleanTopic} - ${cleanName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #090A0F; color: #FFFFFF; border-radius: 16px; border: 1px solid #27272A;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px; border-bottom: 1px solid #27272A; padding-bottom: 16px;">
                <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #FACC15;">Inquiry Baru dari Portofolio</h2>
              </div>
              
              <div style="background-color: #18181B; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #A1A1AA;"><strong>Nama Pengirim:</strong> <span style="color: #FFFFFF;">${cleanName}</span></p>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #A1A1AA;"><strong>Kontak / Email:</strong> <span style="color: #FFFFFF;">${cleanContact}</span></p>
                <p style="margin: 0; font-size: 14px; color: #A1A1AA;"><strong>Kategori Diskusi:</strong> <span style="color: #FACC15; font-weight: 600;">${cleanTopic}</span></p>
              </div>

              <div style="background-color: #18181B; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #71717A;">Detail Pesan:</h4>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #E4E4E7; white-space: pre-wrap;">${cleanMessage}</p>
              </div>

              <p style="margin: 0; font-size: 12px; color: #71717A; text-align: center;">
                Dikirim otomatis via portfolio-bagas.vercel.app &bull; ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" })} WITA
              </p>
            </div>
          `,
        }),
      });

      if (!resendRes.ok) {
        const errData = await resendRes.json();
        console.error("Resend API Error:", errData);
        throw new Error("Gagal mengirim via Resend API.");
      }

      return NextResponse.json({ success: true, provider: "resend" });
    }

    // 4. Option B: Web3Forms API Integration
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: cleanName,
          email: cleanContact.includes("@") ? cleanContact : targetEmail,
          subject: `[Portfolio Inquiry] ${cleanTopic} - ${cleanName}`,
          message: `Nama: ${cleanName}\nKontak: ${cleanContact}\nKategori: ${cleanTopic}\n\nDetail Pesan:\n${cleanMessage}`,
        }),
      });

      const web3Data = await web3Res.json();
      if (!web3Data.success) {
        console.error("Web3Forms Error:", web3Data);
        throw new Error(web3Data.message || "Gagal mengirim via Web3Forms API.");
      }

      return NextResponse.json({ success: true, provider: "web3forms" });
    }

    // 5. Option C: Dev / Simulation Fallback (when no key configured yet)
    console.log("📨 [New Portfolio Inquiry (Dev Simulation)]:", {
      name: cleanName,
      contact: cleanContact,
      topic: cleanTopic,
      message: cleanMessage,
      receivedAt: new Date().toISOString(),
    });

    // Simulate minor network delay for realistic UX testing
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      simulated: true,
      message:
        "Pesan berhasil diterima dalam mode simulasi dev. Pasang RESEND_API_KEY atau WEB3FORMS_ACCESS_KEY di .env.local untuk pengiriman email langsung.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Terjadi kesalahan internal server.";
    console.error("Contact API Route Error:", error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
