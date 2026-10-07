const { query, withTransaction } = require('../config/db');
const AppError = require('../utils/AppError');

// Statuses that take up a slot on a given day.
const COUNTED = ['pending', 'approved', 'checked_in', 'completed'];

const SELECT_WITH_TYPE = `
  SELECT v.*, vt.name AS visit_type_name
  FROM visits v JOIN visit_types vt ON vt.id = v.visit_type_id`;

// Locks the visit_types row so two people can't grab the last slot at once.
exports.createWithCapacityCheck = ({ userId, visitTypeId, visitDate, purpose }) =>
  withTransaction(async (client) => {
    const t = await client.query(
      'SELECT id, daily_capacity, is_active FROM visit_types WHERE id = $1 FOR UPDATE',
      [visitTypeId]
    );
    const type = t.rows[0];
    if (!type || !type.is_active) throw new AppError(404, 'Visit type not found');

    const dup = await client.query(
      `SELECT 1 FROM visits
       WHERE user_id = $1 AND visit_type_id = $2 AND visit_date = $3
         AND status = ANY($4::visit_status[])`,
      [userId, visitTypeId, visitDate, COUNTED]
    );
    if (dup.rowCount > 0) {
      throw new AppError(409, 'You already have a booking for this visit type on that date');
    }

    const count = await client.query(
      `SELECT COUNT(*)::int AS n FROM visits
       WHERE visit_type_id = $1 AND visit_date = $2 AND status = ANY($3::visit_status[])`,
      [visitTypeId, visitDate, COUNTED]
    );
    if (count.rows[0].n >= type.daily_capacity) {
      throw new AppError(409, 'This date is fully booked');
    }

    const ins = await client.query(
      `INSERT INTO visits (user_id, visit_type_id, visit_date, purpose)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, visitTypeId, visitDate, purpose || null]
    );
    return ins.rows[0];
  });

exports.listByUser = async (userId) =>
  (
    await query(`${SELECT_WITH_TYPE} WHERE v.user_id = $1 ORDER BY v.visit_date DESC`, [userId])
  ).rows;

exports.listAll = async (status) => {
  const params = [];
  let where = '';
  if (status) {
    params.push(status);
    where = 'WHERE v.status = $1::visit_status';
  }
  return (
    await query(
      `SELECT v.*, vt.name AS visit_type_name, u.full_name, u.email, u.phone
       FROM visits v
       JOIN visit_types vt ON vt.id = v.visit_type_id
       JOIN users u ON u.id = v.user_id
       ${where}
       ORDER BY v.visit_date ASC, v.created_at ASC`,
      params
    )
  ).rows;
};

exports.cancel = async (id, userId) =>
  (
    await query(
      `UPDATE visits SET status = 'cancelled', updated_at = now()
       WHERE id = $1 AND user_id = $2 AND status IN ('pending', 'approved')
       RETURNING *`,
      [id, userId]
    )
  ).rows[0];

exports.approve = async (id, qrToken) =>
  (
    await query(
      `UPDATE visits SET status = 'approved', qr_token = $2, updated_at = now()
       WHERE id = $1 AND status = 'pending' RETURNING *`,
      [id, qrToken]
    )
  ).rows[0];

exports.reject = async (id, reason) =>
  (
    await query(
      `UPDATE visits SET status = 'rejected', rejection_reason = $2, updated_at = now()
       WHERE id = $1 AND status = 'pending' RETURNING *`,
      [id, reason]
    )
  ).rows[0];

exports.checkIn = async (qrToken) =>
  (
    await query(
      `UPDATE visits SET status = 'checked_in', updated_at = now()
       WHERE qr_token = $1 AND status = 'approved'
         AND visit_date = (now() AT TIME ZONE 'Africa/Nairobi')::date
       RETURNING *`,
      [qrToken]
    )
  ).rows[0];

exports.findByIdWithDetails = async (id) =>
  (
    await query(
      `SELECT v.*, vt.name AS visit_type_name, u.full_name, u.email
       FROM visits v
       JOIN visit_types vt ON vt.id = v.visit_type_id
       JOIN users u ON u.id = v.user_id
       WHERE v.id = $1`,
      [id]
    )
  ).rows[0];

exports.findOwnedById = async (id, userId) =>
  (await query(`${SELECT_WITH_TYPE} WHERE v.id = $1 AND v.user_id = $2`, [id, userId])).rows[0];
