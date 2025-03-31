const express = require('express');

const paginas = express.Router();

paginas.get('/', verificarJWT, (req, res) => {
  res.render("dashboard.hbs");
});
  
paginas.get('/registrar', (req, res) => {
  res.render("registrar/registrar.hbs");
});

paginas.get('/logar', (req, res) => {
  res.render("logar/logar.hbs");
});

paginas.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/logar');
});

module.exports = paginas;