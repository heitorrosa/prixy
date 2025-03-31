const express = require('express');
const controladorAutenticacao = require('../controladores/controladorAutenticacao.js');

const autenticacao = express.Router();

autenticacao.post('/registrar', controladorAutenticacao.registrar);

autenticacao.post('/logar', controladorAutenticacao.logar);

module.exports = autenticacao;