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
        const [rows] = await pool.query("SELECT 1 AS test");
        res.json({ status: "ok", db: rows[0].test });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
