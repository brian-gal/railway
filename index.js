const express = require("express");

const app = express();

// Middleware para JSON
app.use(express.json());

// Puerto dinámico (Railway)
const PORT = process.env.PORT || 3000;
const pool = require("./db");


// Endpoint de prueba
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
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err?.message || null,
            code: err?.code || null,
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
        MYSQL_URL: !!process.env.MYSQL_URL,
    });
});


// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
