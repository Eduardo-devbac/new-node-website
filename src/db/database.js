import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('database connection was closed')
        }
        if (err.code === 'ERR_CON_COUNT_ERROR'){
            console.error('database was to many connections')
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('database connection was refused')
        }
    }
    if (connection) connection.release();
    console.log("database id connect")
    return;
    })

    export default pool;