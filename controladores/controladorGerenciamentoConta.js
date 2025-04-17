const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

dotenv.config({ path: '../.env' });

exports.gerenciarConta = (req, res) => {
    // Configura e conecta a aplicação ao banco de dados MySQL
    const bancoDeDados = mysql.createConnection({
        host: process.env.BANCODADOS_HOST,
        user: process.env.BANCODADOS_USUARIO,
        password: process.env.BANCODADOS_SENHA,
        database: process.env.BANCODADOS
    });

    // Chave secreta para o JWT
    const JWT_SECRET = process.env.JWT_SECRET;

    const {nome, email, senhaAtual, novaSenha, confirmarNovaSenha} = req.body;
};

exports.visualizarDados = (req, res) => {
        // Configura e conecta a aplicação ao banco de dados MySQL
        const bancoDeDados = mysql.createConnection({
            host: process.env.BANCODADOS_HOST,
            user: process.env.BANCODADOS_USUARIO,
            password: process.env.BANCODADOS_SENHA,
            database: process.env.BANCODADOS
        });

        // Chave secreta para o JWT
        const JWT_SECRET = process.env.JWT_SECRET;

    bancoDeDados.query('SELECT * FROM usuarios', (erro, resultado) => {
        if (erro) {
            console.error('Erro ao visualizar os dados: ', erro);
            return res.render('gerenciamentoConta/gerenciamentoConta.hbs', {
                mensagem: 'Erro ao visualizar os dados!'
            });
        } else {
            console.log('Dados visualizados com sucesso!');
            return res.render('gerenciamentoConta/gerenciamentoConta.hbs', {
                dados: resultado
            });
        }
    });
    
};