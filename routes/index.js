const express = require('express');
const router = express.Router();

// Rota da página de login (Acessada via http://localhost:3000/)
router.get('/', (req, res) => {
    res.render('index');
});

// Rota que processa o formulário de login (Acessada quando o formulário envia os dados)
// Mudamos de '/index' para '/' para bater com o padrão dos formulários
router.post('/', (req, res) => {
    const { email, senha } = req.body;

    let usuario = null;
    if (email === 'professor@escola.com' && senha === '123') {
        usuario = { nome: 'Prof. Carlos', tipo: 'professor' };
    } else if (email === 'aluno@escola.com' && senha === '123') {
        usuario = { nome: 'Mariana Silva', tipo: 'aluno' };
    }

    if (usuario) {
        // CORREÇÃO: Salva o usuário na sessão do Express para o login persistir
        req.session.usuario = usuario;
        
        // Redireciona para a página do blog
        res.redirect('/tutorial'); 
    } else {
        res.send( 'index'{error:Usuário ou senha incorretos.'});
    }
});

module.exports = router;
