const express = require('express');
const controladorAutenticacao = require('../controladores/controladorAutenticacao.js');

const autenticacao = express.Router();

autenticacao.post('/registrar', controladorAutenticacao.registrar);

module.exports = autenticacao;