const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


dotenv.config({ path: '../.env' });

exports.registrar = (req, res) => {
    console.log("Dados do registro:", req.body);

    // Configura e conecta a aplição ao banco de dados MySQL
    const bancoDeDados = mysql.createConnection({
        host: process.env.BANCODADOS_HOST,
        user: process.env.BANCODADOS_USUARIO,
        password: process.env.BANCODADOS_SENHA,
        database: process.env.BANCODADOS
    });

    const {nome, email, senha, confirmarSenha} = req.body;

    bancoDeDados.query('SELECT email FROM usuarios WHERE email = ?', [email], async (erro, resultado) => {
        if (erro) {
            console.error('Erro ao verificar o email: ', erro);
        }

        if (resultado.length > 0) {
            return res.render('registrar/registrar.hbs', {
                mensagem: 'Email já cadastrado!'
            });
        } else if (senha !== confirmarSenha) {
            return res.render('registrar/registrar.hbs', {
                mensagem: 'As senhas não coincidem!'
            });
        }

        let senhaHash = await bcrypt.hashSync(senha, 8);
        console.log("Senha criptografada:", senhaHash);

        bancoDeDados.query('INSERT INTO usuarios SET ?', {nome: nome, email: email, senha: senhaHash}, (erro, resultado) => {
            if (erro) {
                console.error('Erro ao registrar o usuário: ', erro);
                return res.render('registrar/registrar.hbs', {
                    mensagem: 'Erro ao registrar o usuário!'
                });
            }

            console.log('Usuário registrado com sucesso!');
            return res.render('registrar/registrar.hbs', {
                mensagem: 'Usuário registrado com sucesso!'
            });
        });
    });
}