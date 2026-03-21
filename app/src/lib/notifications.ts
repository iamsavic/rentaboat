// Brevo email notifications
export async function sendBookingConfirmationEmail(booking: {
  bookingReference: string;
  firstName: string;
  lastName: string;
  email: string;
  tourName: string;
  date: string;
  startTime: string;
  persons: number;
  totalPrice: number;
  language: string;
  locationAddress: string;
  locationGoogleMaps: string;
  locationPhone: string;
  locationWhatsapp: string;
  depositAmount?: number | null;
  requiresDeposit?: boolean;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  const isEn = booking.language === "EN";

  const subject = isEn
    ? `Booking Request Received — #${booking.bookingReference}`
    : `Zahtev za rezervaciju primljen — #${booking.bookingReference}`;

  const html = isEn
    ? buildEnglishEmail(booking)
    : buildSerbianEmail(booking);

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "Rent-a-Boat Budva",
        email: process.env.BREVO_SENDER_EMAIL || "noreply@rentaboat-budva.com",
      },
      to: [{ email: booking.email, name: `${booking.firstName} ${booking.lastName}` }],
      subject,
      htmlContent: html,
    }),
  });
}

export async function sendAdminNotificationEmail(booking: {
  bookingReference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  tourName: string;
  date: string;
  startTime: string;
  persons: number;
  totalPrice: number;
  notes?: string | null;
  adminUrl: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) return;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0284c7; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">🚤 Nova rezervacija #${booking.bookingReference}</h2>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Tura</td><td style="padding: 6px 0; font-weight: 600;">${booking.tourName}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Datum</td><td style="padding: 6px 0; font-weight: 600;">${booking.date} u ${booking.startTime}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Osobe</td><td style="padding: 6px 0; font-weight: 600;">${booking.persons}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Ukupno</td><td style="padding: 6px 0; font-weight: 600; color: #0284c7;">€${booking.totalPrice}</td></tr>
          <tr><td colspan="2" style="border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 8px;"></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Ime</td><td style="padding: 6px 0;">${booking.firstName} ${booking.lastName}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 6px 0;"><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Telefon</td><td style="padding: 6px 0;"><a href="tel:${booking.phone}">${booking.phone}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Država</td><td style="padding: 6px 0;">${booking.country}</td></tr>
          ${booking.notes ? `<tr><td style="padding: 6px 0; color: #64748b; font-size: 14px;">Napomene</td><td style="padding: 6px 0;">${booking.notes}</td></tr>` : ""}
        </table>
        <a href="${booking.adminUrl}" style="display: inline-block; margin-top: 20px; background: #0284c7; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Pregledaj rezervaciju →
        </a>
      </div>
    </div>
  `;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: {
        name: "Rent-a-Boat System",
        email: process.env.BREVO_SENDER_EMAIL || "noreply@rentaboat-budva.com",
      },
      to: [{ email: adminEmail }],
      subject: `Nova rezervacija #${booking.bookingReference} — ${booking.firstName} ${booking.lastName}`,
      htmlContent: html,
    }),
  });
}

export async function sendTelegramNotification(booking: {
  bookingReference: string;
  firstName: string;
  lastName: string;
  phone: string;
  tourName: string;
  date: string;
  startTime: string;
  persons: number;
  totalPrice: number;
  adminUrl: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) return;

  const message = `🚤 *Nova rezervacija #${booking.bookingReference}*\n\nTura: ${booking.tourName}\nDatum: ${booking.date} u ${booking.startTime}\nOsobe: ${booking.persons}\nCena: €${booking.totalPrice}\n\nIme: ${booking.firstName} ${booking.lastName}\nTel: ${booking.phone}\n\n[Pregledaj →](${booking.adminUrl})`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  });
}

function buildEnglishEmail(b: Parameters<typeof sendBookingConfirmationEmail>[0]): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0284c7; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">⚓ Rent-a-Boat Budva</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">Booking Request Received</p>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: 0;">
        <p>Hi ${b.firstName},</p>
        <p>Thank you for your booking request! Your reference number is:</p>
        <div style="text-align: center; background: #f0f9ff; border: 2px solid #0284c7; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #0284c7; font-family: monospace;">${b.bookingReference}</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Tour</td><td style="padding: 8px 12px; font-weight: 600;">${b.tourName}</td></tr>
          <tr><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Date</td><td style="padding: 8px 12px; font-weight: 600;">${b.date} at ${b.startTime}</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Passengers</td><td style="padding: 8px 12px; font-weight: 600;">${b.persons}</td></tr>
          <tr><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Total</td><td style="padding: 8px 12px; font-weight: 600; color: #0284c7;">€${b.totalPrice}</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Payment</td><td style="padding: 8px 12px;">Cash at Budva Marina</td></tr>
        </table>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; color: #166534; font-size: 15px;">📍 Before You Arrive</h3>
          <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px; line-height: 1.8;">
            <li>Location: <a href="${b.locationGoogleMaps}" style="color: #0284c7;">Budva Marina</a> — ${b.locationAddress}</li>
            <li>Please arrive <strong>10 minutes before departure</strong></li>
            <li>Bring: Valid ID/passport, Cash, Swimwear & towel, Sunscreen</li>
            <li>Contact: <a href="tel:${b.locationPhone}" style="color: #0284c7;">${b.locationPhone}</a> | <a href="https://wa.me/${b.locationWhatsapp}" style="color: #0284c7;">WhatsApp</a></li>
          </ul>
        </div>
        <p style="color: #64748b; font-size: 14px;">We will confirm your booking shortly. See you on the water! 🌊</p>
      </div>
      <div style="text-align: center; padding: 16px; color: #94a3b8; font-size: 12px;">
        © ${new Date().getFullYear()} Rent-a-Boat Budva
      </div>
    </div>
  `;
}

function buildSerbianEmail(b: Parameters<typeof sendBookingConfirmationEmail>[0]): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0284c7; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">⚓ Rent-a-Boat Budva</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">Zahtev za rezervaciju primljen</p>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: 0;">
        <p>Zdravo ${b.firstName},</p>
        <p>Hvala na zahtevu za rezervaciju! Vaš broj rezervacije je:</p>
        <div style="text-align: center; background: #f0f9ff; border: 2px solid #0284c7; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #0284c7; font-family: monospace;">${b.bookingReference}</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Tura</td><td style="padding: 8px 12px; font-weight: 600;">${b.tourName}</td></tr>
          <tr><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Datum</td><td style="padding: 8px 12px; font-weight: 600;">${b.date} u ${b.startTime}</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Putnici</td><td style="padding: 8px 12px; font-weight: 600;">${b.persons}</td></tr>
          <tr><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Ukupno</td><td style="padding: 8px 12px; font-weight: 600; color: #0284c7;">€${b.totalPrice}</td></tr>
          <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-size: 14px; color: #64748b;">Plaćanje</td><td style="padding: 8px 12px;">Keš na Budva Marini</td></tr>
        </table>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 12px; color: #166534; font-size: 15px;">📍 Pre dolaska</h3>
          <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px; line-height: 1.8;">
            <li>Lokacija: <a href="${b.locationGoogleMaps}" style="color: #0284c7;">Budva Marina</a> — ${b.locationAddress}</li>
            <li>Molimo budite na lokaciji <strong>10 minuta pre polaska</strong></li>
            <li>Ponesite: Ličnu kartu ili pasoš, Novac, Kupaći i peškir, Kremu za sunce</li>
            <li>Kontakt: <a href="tel:${b.locationPhone}" style="color: #0284c7;">${b.locationPhone}</a> | <a href="https://wa.me/${b.locationWhatsapp}" style="color: #0284c7;">WhatsApp</a></li>
          </ul>
        </div>
        <p style="color: #64748b; font-size: 14px;">Uskoro ćemo potvrditi vašu rezervaciju. Vidimo se na vodi! 🌊</p>
      </div>
      <div style="text-align: center; padding: 16px; color: #94a3b8; font-size: 12px;">
        © ${new Date().getFullYear()} Rent-a-Boat Budva
      </div>
    </div>
  `;
}
