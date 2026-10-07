const { query } = require('../config/db');

exports.listActive = async () =>
  (
    await query(
      'SELECT id, name, description, daily_capacity FROM visit_types WHERE is_active = true ORDER BY id'
    )
  ).rows;
