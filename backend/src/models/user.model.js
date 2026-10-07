const { query } = require('../config/db');

const PUBLIC_FIELDS = 'id, full_name, email, phone, role, created_at';

exports.findByEmail = async (email) =>
  (await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])).rows[0];

exports.findById = async (id) =>
  (await query(`SELECT ${PUBLIC_FIELDS} FROM users WHERE id = $1`, [id])).rows[0];

exports.create = async ({ fullName, email, phone, passwordHash }) =>
  (
    await query(
      `INSERT INTO users (full_name, email, phone, password_hash)
       VALUES ($1, $2, $3, $4) RETURNING ${PUBLIC_FIELDS}`,
      [fullName, email.toLowerCase(), phone || null, passwordHash]
    )
  ).rows[0];
