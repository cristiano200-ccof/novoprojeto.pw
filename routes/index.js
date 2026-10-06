const express = require('express');
const router = express.Router();

// Rota da página de login
router.get('/', (req, res) => {
    res.render('index');
});

// Rota que processa o formulário de login
router.post('/index', (req, res) => {
    const { email, senha } = req.body;

    let usuario = null;
    if (email === 'professor@escola.com' && senha === '123') {
        usuario = { nome: 'Prof. Carlos', tipo: 'professor' };
    } else if (email === 'aluno@escola.com' && senha === '123') {
        usuario = { nome: 'Mariana Silva', tipo: 'aluno' };
    }

    if (usuario) {
        req.session.user = usuario;
        res.redirect('/blog'); // Redireciona para a rota do blog
    } else {
        res.send('Usuário ou senha incorretos.');
    }
});

module.exports = router;
