const express = require('express');
const router = express.Router();

// Rota para mostrar a página de login
router.get('/login', (req, res) => {
    res.render('login', { usuario: null }); 
});

// Rota que processa o formulário de login
router.post('/auth/login', (req, res) => {
    const { email, senha, tipo } = req.body;

    let usuario = null;

    if (tipo === 'professor' && email === 'professor@escola.com' && senha === '123') {
        usuario = { nome: 'Prof. Carlos', tipo: 'professor' };
    } else if (tipo === 'aluno' && email === 'aluno@escola.com' && senha === '123') {
        usuario = { nome: 'Mariana Silva', tipo: 'aluno' };
    }

    if (usuario) {
        req.session.user = usuario;
        res.redirect('/blog'); 
    } else {
        res.send('Dados incorretos ou perfil de usuário inválido.');
    }
});


module.exports = router;
