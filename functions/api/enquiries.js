import { connect } from "cloudflare:sockets";

const MAX_FIELDS = 30;
const MAX_VALUE_LENGTH = 4000;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

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

function json(data, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

function base64(value) {
  const bytes = encoder.encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

class SmtpConnection {
  constructor(socket) {
    this.socket = socket;
    this.buffer = "";
    this.setStreams();
  }

  setStreams() {
    this.reader = this.socket.readable.getReader();
    this.writer = this.socket.writable.getWriter();
  }

  async response(expected) {
    while (true) {
      const lines = this.buffer.split("\r\n");
      for (let index = 0; index < lines.length - 1; index += 1) {
        const line = lines[index];
        if (/^\d{3} /.test(line)) {
          this.buffer = lines.slice(index + 1).join("\r\n");
          const code = Number(line.slice(0, 3));
          if (!expected.includes(code)) throw new Error(`SMTP rejected request (${code})`);
          return code;
        }
      }
      const { value, done } = await this.reader.read();
      if (done) throw new Error("SMTP connection closed unexpectedly");
      this.buffer += decoder.decode(value, { stream: true });
    }
  }

  async command(command, expected = [250]) {
    await this.writer.write(encoder.encode(`${command}\r\n`));
    return this.response(expected);
  }

  async startTls() {
    this.reader.releaseLock();
    this.writer.releaseLock();
    this.socket = this.socket.startTls();
    this.buffer = "";
    this.setStreams();
  }
}

async function sendWithGmail({ env, name, email, source, details, confirmation = false }) {
  const host = env.SMTP_HOST;
  const port = Number(env.SMTP_PORT || 587);
  const user = env.SMTP_USER;
  const pass = env.SMTP_PASS;
  const enquiryRecipient = env.CONTACT_TO_EMAIL || "vikranth.chemicals@gmail.com";
  const recipient = confirmation ? email : enquiryRecipient;
  if (!host || !user || !pass || !recipient) throw new Error("SMTP is not configured");

  const socket = connect({ hostname: host, port }, { secureTransport: port === 465 ? "on" : "starttls" });
  const smtp = new SmtpConnection(socket);
  await smtp.response([220]);
  await smtp.command("EHLO vikranthchemicalcorporation.com");
  if (port !== 465) {
    await smtp.command("STARTTLS", [220]);
    await smtp.startTls();
    await smtp.command("EHLO vikranthchemicalcorporation.com");
  }
  await smtp.command("AUTH LOGIN", [334]);
  await smtp.command(base64(user), [334]);
  await smtp.command(base64(pass), [235]);
  await smtp.command(`MAIL FROM:<${user.replace(/[\r\n<>]/g, "")}>`);
  await smtp.command(`RCPT TO:<${recipient.replace(/[\r\n<>]/g, "")}>`, [250, 251]);
  await smtp.command("DATA", [354]);

  const rows = Object.entries(details)
    .map(([label, value]) => `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;background:#fff7f1;border:1px solid #ead8cb">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #ead8cb;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
    .join("");
  const safeName = name.replace(/[\r\n<>]/g, "");
  const safeEmail = email.replace(/[\r\n<>]/g, "");
  const productNote = details.Product ? `<p>We received your enquiry about <strong>${escapeHtml(details.Product)}</strong>.</p>` : "";
  const subject = confirmation ? "Thank you for contacting Vikranth Chemical Corporation" : `[VCC Website] ${source}`;
  const html = confirmation
    ? `<div style="font-family:Arial,sans-serif;color:#2f1b12;line-height:1.6"><h2 style="color:#a54118">Thank you for contacting us</h2><p>Hello ${escapeHtml(name)},</p>${productNote}<p>We have received your enquiry. Our team will review your requirement and contact you shortly.</p><p>Regards,<br><strong>Vikranth Chemical Corporation</strong></p></div>`
    : `<div style="font-family:Arial,sans-serif;color:#2f1b12"><h2 style="color:#a54118">New website enquiry</h2><p><strong>Source:</strong> ${escapeHtml(source)}</p><p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`;
  const message = [
    `From: VCC Website <${user}>`,
    `To: ${recipient}`,
    `Reply-To: ${confirmation ? `Vikranth Chemical Corporation <${enquiryRecipient}>` : `${safeName} <${safeEmail}>`}`,
    `Subject: =?UTF-8?B?${base64(subject)}?=`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
  ].join("\r\n").replace(/\r\n\./g, "\r\n..");

  await smtp.command(`${message}\r\n.`, [250]);
  await smtp.command("QUIT", [221]);
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const name = clean(body.name);
    const email = clean(body.email);
    const source = clean(body.source || "Website enquiry").slice(0, 100);
    const details = normalizeDetails(body.details);
    if (body.website) return json({ ok: true });
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Please provide a valid name and email address." }, 400);
    }
    await sendWithGmail({ env: context.env, name, email, source, details });
    try {
      await sendWithGmail({ env: context.env, name, email, source, details, confirmation: true });
    } catch (confirmationError) {
      console.error("Enquiry received, but customer confirmation could not be sent:", confirmationError);
    }
    return json({ ok: true });
  } catch (error) {
    console.error("Unable to send website enquiry:", error);
    return json({ error: "We could not send your enquiry. Please retry or contact us by phone or WhatsApp." }, 500);
  }
}
