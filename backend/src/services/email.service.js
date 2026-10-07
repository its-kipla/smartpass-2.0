const nodemailer = require('nodemailer');
const qr = require('./qr.service');

let transporter;
const getTransporter = () => {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

// visit_date is 'YYYY-MM-DD'; Nairobi is UTC+3 all year.
const prettyDate = (d) =>
  new Date(`${d}T00:00:00+03:00`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi',
  });

const send = async (mail) => {
  const t = getTransporter();
  if (!t) {
    console.log(`[email skipped: SMTP not configured] to=${mail.to} subject="${mail.subject}"`);
    return;
  }
  await t.sendMail({ from: process.env.EMAIL_FROM, ...mail });
};

// `visit` = row from Visit.findByIdWithDetails (includes full_name, email, visit_type_name)
exports.sendVisitApproved = async (visit) => {
  const png = await qr.toPngBuffer(visit.qr_token);
  const when = prettyDate(visit.visit_date);

  await send({
    to: visit.email,
    subject: 'Your Konza Smart Pass is confirmed',
    text:
      `Hi ${visit.full_name},\n\nYour visit (${visit.visit_type_name}) on ${when} is approved.\n` +
      `Show the attached QR code at the gate on the day of your visit.\n\nKonza Technology City`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#111">
        <h2 style="color:#0a7a3d">Your visit is confirmed</h2>
        <p>Hi ${esc(visit.full_name)},</p>
        <p>Your <strong>${esc(visit.visit_type_name)}</strong> visit to Konza Technology City
           on <strong>${esc(when)}</strong> has been approved.</p>
        <p>Show this QR code at the gate when you arrive:</p>
        <p style="text-align:center"><img src="cid:smartpass-qr" alt="Smart Pass QR code" width="240" height="240"></p>
        <p style="font-size:13px;color:#555">The pass is valid only on the date above and can be used once.
           If your plans change, cancel the booking in your Smart Pass account.</p>
      </div>`,
    attachments: [{ filename: 'smartpass-qr.png', content: png, cid: 'smartpass-qr' }],
  });
};

exports.sendVisitRejected = async (visit) => {
  await send({
    to: visit.email,
    subject: 'Update on your Konza visit request',
    text:
      `Hi ${visit.full_name},\n\nWe could not approve your ${visit.visit_type_name} visit on ` +
      `${prettyDate(visit.visit_date)}.\nReason: ${visit.rejection_reason}\n\n` +
      `You are welcome to submit a new request for another date.\n\nKonza Technology City`,
  });
};
