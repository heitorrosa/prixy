const express = require('express');
const controladorAutenticacao = require('../controladores/controladorAutenticacao.js');
const gerenciamentoConta = require('../controladores/controladorGerenciamentoConta.js');

const rotas = express.Router();

rotas.post('/registrar', controladorAutenticacao.registrar);

rotas.post('/logar', controladorAutenticacao.logar);

rotas.post('/gerenciarConta', gerenciamentoConta.gerenciarConta);

module.exports = rotas;