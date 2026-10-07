require('dotenv').config();
const app = require('./app');
const { pool } = require('./config/db');

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
  console.error('Missing JWT_SECRET or DATABASE_URL in .env');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to PostgreSQL');
    app.listen(PORT, () => console.log(`Smart Pass API running on port ${PORT}`));
  } catch (err) {
    console.error('Could not connect to PostgreSQL:', err.message);
    process.exit(1);
  }
})();
