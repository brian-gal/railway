const express = require("express");
const app = express();

app.use(express.json());

const pool = require("./db");

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend POC funcionando en Railway"
    });
});

app.get("/db-test", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS ok");
        res.json({ status: "ok", value: rows[0].ok });
    } catch (err) {
        console.error("DB ERROR:", err);
        res.status(500).json({
            status: "error",
            message: err?.message || null,
            code: err?.code || null,
            errno: err?.errno || null
        });
    }
});

app.get("/env-check", (req, res) => {
    res.json({
        MYSQLHOST: !!process.env.MYSQLHOST,
        MYSQLPORT: !!process.env.MYSQLPORT,
        MYSQLUSER: !!process.env.MYSQLUSER,
        MYSQLPASSWORD: !!process.env.MYSQLPASSWORD,
        MYSQLDATABASE: !!process.env.MYSQLDATABASE,
        MYSQL_URL: !!process.env.MYSQL_URL
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
