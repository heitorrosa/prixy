const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const paginas = express.Router();

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

// Chave secreta para o JWT e middleware para o cookie
const JWT_SECRET = process.env.JWT_SECRET;
paginas.use(cookieParser());

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