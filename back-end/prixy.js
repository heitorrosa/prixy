const express = require("express");
const path = require("path");
const mySQL = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const prixy = express();

// Configura a conexão com o banco de dados MySQL (XAMPP)
const bancoDados = mySQL.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USUARIO,
    password: process.env.DATABASE_SENHA,
    database: process.env.DATABASE
});

// Conecta ao banco de dados MySQL (XAMPP)
bancoDados.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

// Configura um diretório público para servir arquivos estáticoss
const diretorioPublico = path.join(__dirname, '../front-end');
prixy.use(express.static(diretorioPublico));
prixy.set('views', path.join(__dirname, '../front-end'));

prixy.get("/", (req, res) => {
    // res.send("<a>Sucesso!</a>")
    res.render("../front-end/pages/preLogin/login/login.hbs");
})

prixy.listen(5000, () => {
    console.log("Servidor iniciado na porta 5000");
}) 