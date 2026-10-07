const crypto = require('crypto');
const Visit = require('../models/visit.model');
const AppError = require('../utils/AppError');
const { todayInNairobi } = require('../utils/dates');
const qr = require('./qr.service');
const email = require('./email.service');

// Emails are sent in the background: a mail failure must never undo an approval.
const sendInBackground = (promise, label) =>
  promise.catch((err) => console.error(`${label} email failed:`, err.message));

exports.create = async (userId, { visitTypeId, visitDate, purpose }) => {
  if (visitDate < todayInNairobi()) throw new AppError(400, 'Visit date cannot be in the past');
  return Visit.createWithCapacityCheck({ userId, visitTypeId, visitDate, purpose });
};

exports.cancel = async (id, userId) => {
  const visit = await Visit.cancel(id, userId);
  if (!visit) throw new AppError(404, 'Booking not found or can no longer be cancelled');
  return visit;
};

exports.approve = async (id) => {
  const qrToken = crypto.randomBytes(16).toString('hex');
  const approved = await Visit.approve(id, qrToken);
  if (!approved) throw new AppError(404, 'Pending booking not found');

  const details = await Visit.findByIdWithDetails(id);
  sendInBackground(email.sendVisitApproved(details), 'Approval');
  return approved;
};

exports.reject = async (id, reason) => {
  const rejected = await Visit.reject(id, reason);
  if (!rejected) throw new AppError(404, 'Pending booking not found');

  const details = await Visit.findByIdWithDetails(id);
  sendInBackground(email.sendVisitRejected(details), 'Rejection');
  return rejected;
};

// Visitor opens their pass in the app.
exports.getPass = async (id, userId) => {
  const visit = await Visit.findOwnedById(id, userId);
  if (!visit) throw new AppError(404, 'Booking not found');
  if (!visit.qr_token || !['approved', 'checked_in'].includes(visit.status)) {
    throw new AppError(409, 'Your pass is available once the booking is approved');
  }
  return { visit, qrDataUrl: await qr.toDataUrl(visit.qr_token) };
};

// Gate scans the QR. Returns visitor details so the guard can confirm who it is.
exports.checkIn = async (qrToken) => {
  const checked = await Visit.checkIn(qrToken);
  if (!checked) throw new AppError(404, 'No approved booking for today matches this pass');
  return Visit.findByIdWithDetails(checked.id);
};
