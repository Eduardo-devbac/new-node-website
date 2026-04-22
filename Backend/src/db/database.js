import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test de conexión
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Database connected to Railway");
    conn.release();
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

export default pool;