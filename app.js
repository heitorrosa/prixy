const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config({ path: './.env' });

// Configura e conecta a aplição ao banco de dados MySQL (XAMPP)
const bancoDeDados = mysql.createConnection({
    host: process.env.BANCODADOS_HOST,
    user: process.env.BANCODADOS_USUARIO,
    password: process.env.BANCODADOS_SENHA,
    database: process.env.BANCODADOS_SISTEMALOGIN
});

bancoDeDados.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados: ', erro);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Configura um diretório público para servir arquivos estáticoss
const diretorioPublico = path.join(__dirname, '/frontend');
app.use(express.static(diretorioPublico));

console.log(`Diretório público: ${diretorioPublico}`);


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/frontend'));

// Configura rotas para facilitar a navegação entre as páginas do Website e a organização do código
app.use('/', require('./rotas/paginas.js'));
app.use('/autenticacao', require('./rotas/autenticacao.js'));


app.listen(8080, () => {
  console.log('O servidor está rodando na porta 8080!');
});