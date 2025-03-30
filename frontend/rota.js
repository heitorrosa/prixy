const express = require('express');

const rota = express.Router();

rota.get('/', (req, res) => {
    res.render("dashboard.hbs");
  });
  
rota.get('/registrar', (req, res) => {
    res.render("registrar/registrar.hbs");
  });

module.exports = rota;