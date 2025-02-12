require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME,
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("Connection successful:", res);
  } catch (err) {
    console.error("Connection error:", err);
  }
}

testConnection();

module.exports = pool;
