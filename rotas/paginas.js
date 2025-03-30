const express = require('express');

const paginas = express.Router();

paginas.get('/', (req, res) => {
    res.render("dashboard.hbs");
  });
  
paginas.get('/registrar', (req, res) => {
    res.render("registrar/registrar.hbs");
  });

module.exports = paginas;