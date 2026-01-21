const express = require("express");

const app = express();

// Middleware para JSON
app.use(express.json());

// Puerto dinámico (Railway)
const PORT = process.env.PORT || 3000;

// Endpoint de prueba
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Backend POC funcionando en Railway"
    });
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
