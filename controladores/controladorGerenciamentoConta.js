const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

dotenv.config({ path: '../.env' });

exports.gerenciarConta = (req, res) => {
    console.log("Dados do gerenciamento de conta:", req.body);
    // Configura e conecta a aplição ao banco de dados MySQL
    const bancoDeDados = mysql.createConnection({
        host: process.env.BANCODADOS_HOST,
        user: process.env.BANCODADOS_USUARIO,
        password: process.env.BANCODADOS_SENHA,
        database: process.env.BANCODADOS
    });

    // Chave secreta para o JWT
    const JWT_SECRET = process.env.JWT_SECRET;

    const {nome, email, senha, confirmarSenha} = req.body;

     
}