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
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.json({
            status: "ok",
            result: rows[0].result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "MySQL connection failed" });
    }
});


// Endpoint de prueba POST (sin DB todavía)
app.post("/test", (req, res) => {
    res.json({
        received: req.body,
        message: "POST funcionando"
    });
});

// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
