const express = require("express");

const prixy = express();

prixy.get("/", (req, res) => {
    res.send("<a>Pong!</a>")
})

prixy.listen(5000, () => {
    console.log("Servidor iniciado na porta 5000");
}) 