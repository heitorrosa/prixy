const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({ path: './.env' });

// Configura e conecta a aplição ao banco de dados MySQL
const bancoDeDados = mysql.createConnection({
    host: process.env.BANCODADOS_HOST,
    user: process.env.BANCODADOS_USUARIO,
    password: process.env.BANCODADOS_SENHA,
    database: process.env.BANCODADOS
});

bancoDeDados.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados: ', erro);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Configura um diretório público para servir arquivos estáticos e o Handlebars
const diretorioPublico = path.join(__dirname, '/frontend');
app.use(express.static(diretorioPublico));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/frontend'));

// Configura o middleware para processar dados de formulários e JSON
// O middleware é um código que fica entre o pedido do cliente e a resposta do servidor
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

console.log(`Diretório público: ${diretorioPublico}`);

// Middleware para verificar JWT
const verificarJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.redirect('/logar');
            } else {
                req.user = decodedToken;
                next();
            }
        });
    } else {
        res.redirect('/logar');
    }
};

module.exports = verificarJWT;

// Configura rotas para facilitar a navegação entre as páginas do Website e a organização do código
app.use('/', require('./rotas/paginas.js'));
app.use('/rotas', require('./rotas/rotas.js'));


app.listen(8080, () => {
  console.log('O servidor está rodando na porta 8080!');
});