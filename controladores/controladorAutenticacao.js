const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

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

    // Chave secreta para o JWT
    const JWT_SECRET = process.env.JWT_SECRET;

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

exports.logar = (req, res) => {
    console.log("Dados do login:", req.body);

    // Configura e conecta a aplição ao banco de dados MySQL
        const bancoDeDados = mysql.createConnection({
            host: process.env.BANCODADOS_HOST,
            user: process.env.BANCODADOS_USUARIO,
            password: process.env.BANCODADOS_SENHA,
            database: process.env.BANCODADOS
        });

        // Chave secreta para o JWT
        const JWT_SECRET = process.env.JWT_SECRET;

        const { email, senha } = req.body;

        bancoDeDados.query('SELECT * FROM usuarios WHERE email = ?', [email], (erro, resultado) => {
            if (erro || resultado.length === 0) {
                console.error('Erro ao logar o usuário: ', erro);
                return res.render('logar/logar.hbs', {
                    mensagem: 'Email incorreto ou não cadastrado!'
                });

            }
        
            const usuario = resultado[0];
        
            bcrypt.compare(senha, usuario.senha, (erro, senhasIguais) => {
                if (erro || !senhasIguais) {
                    return res.render('logar/logar.hbs', {
                        mensagem: 'Senha incorreta ou não cadastrada!'
                    });
                }
        
                const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, JWT_SECRET, {
                    expiresIn: '1h'
                });
        
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 3600000 // 1 hora
                });
        
                res.redirect('/');
            });
        });
}