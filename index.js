const express = require("express");
const app = express();

app.use(express.json());

const pool = require("./db");

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend POC funcionando en Railway",
    });
});

const net = require("net");

app.get("/env-dump", (req, res) => {
    res.json({
        MYSQLHOST: process.env.MYSQLHOST || null,
        MYSQLPORT: process.env.MYSQLPORT || null,
        MYSQLUSER: process.env.MYSQLUSER || null,
        MYSQLPASSWORD: process.env.MYSQLPASSWORD || null,
        MYSQLDATABASE: process.env.MYSQLDATABASE || null,
        MYSQL_URL: process.env.MYSQL_URL || null,
    });
});

app.get("/tcp-test", async (req, res) => {
    const host = process.env.MYSQLHOST;
    const port = Number(process.env.MYSQLPORT);

    if (!host || !port) {
        return res.status(400).json({ ok: false, error: "Falta MYSQLHOST o MYSQLPORT", host, port });
    }

    const socket = new net.Socket();
    const timeoutMs = 5000;

    const result = await new Promise((resolve) => {
        const done = (payload) => {
            try { socket.destroy(); } catch { }
            resolve(payload);
        };

        socket.setTimeout(timeoutMs);

        socket.once("connect", () => done({ ok: true, host, port, message: "TCP connect OK" }));
        socket.once("timeout", () => done({ ok: false, host, port, error: "TIMEOUT" }));
        socket.once("error", (err) => done({ ok: false, host, port, error: err.code || err.message }));
        socket.connect(port, host);
    });

    res.json(result);
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
            errno: err?.errno || null,
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
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
