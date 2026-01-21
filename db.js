const mysql = require("mysql2/promise");

const database =
    process.env.MYSQLDATABASE ||
    process.env.MYSQL_DATABASE;

const pool = mysql.createPool({
    uri: process.env.MYSQL_URL || process.env.DATABASE_URL,
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database,
    port: Number(process.env.MYSQLPORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
