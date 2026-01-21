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


app.post("/portal-users", async (req, res) => {
    try {
        const name = req.body?.name || "Nombre Predeterminado";
        const result = await pool.query(
            "INSERT INTO portal_users (name) VALUES (?)",
            [name]
        );
        res.json({ status: "ok", id: result[0].insertId });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el nombre." });
    }
});



// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
