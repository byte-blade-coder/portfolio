import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    // --- Sender metadata ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    const userAgent = req.headers.get("user-agent") || "Unknown";
    const referer = req.headers.get("referer") || "Direct";

    // Parse browser & OS from User-Agent (simple)
    const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg");
    const isFirefox = userAgent.includes("Firefox");
    const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
    const isEdge = userAgent.includes("Edg");
    const browser = isChrome ? "Chrome" : isFirefox ? "Firefox" : isSafari ? "Safari" : isEdge ? "Edge" : "Unknown Browser";

    const isWindows = userAgent.includes("Windows");
    const isMac = userAgent.includes("Mac OS");
    const isLinux = userAgent.includes("Linux") && !userAgent.includes("Android");
    const isAndroid = userAgent.includes("Android");
    const isIOS = userAgent.includes("iPhone") || userAgent.includes("iPad");
    const os = isWindows ? "Windows" : isMac ? "macOS" : isAndroid ? "Android" : isIOS ? "iOS" : isLinux ? "Linux" : "Unknown OS";

    const sentAt = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "short",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 620px; margin: 0 auto; background: #f8fafc; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0d9488, #0f766e); padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">📩 New Portfolio Message</h1>
            <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">${sentAt} (Pakistan Time)</p>
          </div>

          <!-- Sender Info -->
          <div style="padding: 32px 40px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; width: 110px;">
                  <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Name</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-size: 15px; font-weight: 700; color: #0f172a;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Email</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${email}" style="color: #0d9488; font-weight: 700; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Subject</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-size: 15px; font-weight: 700; color: #0f172a;">${subject}</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Message Body -->
          <div style="padding: 28px 40px;">
            <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 12px;">Message</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px 24px;">
              <p style="white-space: pre-wrap; color: #334155; font-size: 15px; line-height: 1.7; margin: 0;">${message}</p>
            </div>
          </div>

          <!-- Metadata Footer -->
          <div style="background: #f1f5f9; border-top: 1px solid #e2e8f0; padding: 20px 40px;">
            <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 10px;">📍 Sender Info</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #475569;">
              <tr>
                <td style="padding: 4px 0; width: 110px; font-weight: 600; color: #64748b;">IP Address</td>
                <td style="padding: 4px 0;">${ip}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Browser</td>
                <td style="padding: 4px 0;">${browser}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #64748b;">OS</td>
                <td style="padding: 4px 0;">${os}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600; color: #64748b;">Referer</td>
                <td style="padding: 4px 0;">${referer}</td>
              </tr>
            </table>
          </div>

          <!-- Quick Reply -->
          <div style="padding: 20px 40px 32px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; font-weight: 700; font-size: 13px; padding: 12px 28px; border-radius: 50px; text-decoration: none; letter-spacing: 0.5px;">
              ↩ Reply to ${name}
            </a>
          </div>

        </div>
      `,
    });

    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
