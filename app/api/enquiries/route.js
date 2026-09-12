import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FIELDS = 30;
const MAX_VALUE_LENGTH = 4000;

function clean(value) {
  return String(value ?? "").replace(/\0/g, "").trim().slice(0, MAX_VALUE_LENGTH);
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeDetails(details) {
  if (!details || typeof details !== "object" || Array.isArray(details)) return {};
  return Object.fromEntries(
    Object.entries(details)
      .slice(0, MAX_FIELDS)
      .map(([key, value]) => [clean(key).slice(0, 80), clean(value)])
      .filter(([key, value]) => key && value)
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name);
    const email = clean(body.email);
    const source = clean(body.source || "Website enquiry").slice(0, 100);
    const details = normalizeDetails(body.details);

    if (body.website) return Response.json({ ok: true });
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please provide a valid name and email address." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_TO_EMAIL || "vikranth.chemicals@gmail.com";

    if (!host || !user || !pass || !recipient) {
      console.error("Enquiry email is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.");
      return Response.json({ error: "Email delivery is temporarily unavailable. Please contact us by phone or WhatsApp." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const rows = Object.entries(details)
      .map(([label, value]) => `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;background:#fff7f1;border:1px solid #ead8cb">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #ead8cb;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
      .join("");

    await transporter.sendMail({
      from: `VCC Website <${user}>`,
      to: recipient,
      replyTo: `${name.replace(/[\r\n<>]/g, "")} <${email}>`,
      subject: `[VCC Website] ${source}`,
      text: [`Source: ${source}`, `Name: ${name}`, `Email: ${email}`, ...Object.entries(details).map(([key, value]) => `${key}: ${value}`)].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;color:#2f1b12"><h2 style="color:#a54118">New website enquiry</h2><p><strong>Source:</strong> ${escapeHtml(source)}</p><p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`,
    });

    try {
      const productNote = details.Product ? `<p>We received your enquiry about <strong>${escapeHtml(details.Product)}</strong>.</p>` : "";
      await transporter.sendMail({
        from: `Vikranth Chemical Corporation <${user}>`,
        to: email,
        replyTo: recipient,
        subject: "Thank you for contacting Vikranth Chemical Corporation",
        text: `Hello ${name},\n\nThank you for contacting Vikranth Chemical Corporation. We have received your enquiry. Our team will review your requirement and contact you shortly.\n\nRegards,\nVikranth Chemical Corporation`,
        html: `<div style="font-family:Arial,sans-serif;color:#2f1b12;line-height:1.6"><h2 style="color:#a54118">Thank you for contacting us</h2><p>Hello ${escapeHtml(name)},</p>${productNote}<p>We have received your enquiry. Our team will review your requirement and contact you shortly.</p><p>Regards,<br><strong>Vikranth Chemical Corporation</strong></p></div>`,
      });
    } catch (confirmationError) {
      console.error("Enquiry received, but customer confirmation could not be sent:", confirmationError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Unable to send website enquiry:", error);
    return Response.json({ error: "We could not send your enquiry. Please retry or contact us by phone or WhatsApp." }, { status: 500 });
  }
}
