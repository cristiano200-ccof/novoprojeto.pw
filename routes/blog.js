/*const express = require('express');
const router = express.Router();

// Middleware que bloqueia quem não estiver logado
function garantirAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); 
    }
    res.redirect('/'); 
}

// Rota protegida do blog
router.get('/', garantirAutenticacao, async function(req, res, next) {
   try{
    const poemasDoBanco = await Poema.find().short({ dataCriacao: -1}); res.render('blog', { 
        titulo: 'Blog', 
        usuario: req.session.usuario,
       poemas: poemasDoBanco // Opcional: passa os dados para a página
    }); 
} catch (err) {
    console.error("Erro ao buscar poemas:" , err);
    res.status(500).send("Erro interno ao carregar poemas do banco.");
 }
});

module.exports = router; */

// routes/blog.js
const express = require('express');
const router = express.Router();

// BANCO DE DADOS SIMULADO (Fica salvo na memória enquanto o servidor estiver rodando)
let poemasDoBanco = [
    {
        _id: "1",
        autor: "Mariana Silva",
        titulo: "O Canto da Alvorada",
        conteudo: "No romper da manhã, o sol aponta no horizonte...\nE a poesia ganha vida no papel.",
        feedbacks: [
            { professor: "Prof. Carlos", texto: "Excelente métrica, Mariana! Parabéns pelo progresso." }
        ]
    }
];

// Middleware que bloqueia quem não estiver logado
function garantirAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); 
    }
    res.redirect('/'); 
}

// Rota protegida do blog (Abrindo sem depender de banco de dados externo)
router.get('/', garantirAutenticacao, function(req, res, next) {
    try {
        // Renderiza a página passando nossa lista simulada lá de cima
        res.render('blog', { 
            titulo: 'Blog', 
            usuario: req.session.usuario,
            poemas: poemasDoBanco // Passando os dados fictícios com sucesso!
        }); 
    } catch (err) {
        console.error("Erro ao renderizar a tela:", err);
        res.status(500).send("Erro interno ao carregar a página.");
    }
});

// Rota para o ALUNO postar um novo poema (Simulado)
router.post('/postar', garantirAutenticacao, function(req, res) {
    const { titulo, conteudo } = req.body;
    
    const novoPoema = {
        _id: String(poemasDoBanco.length + 1),
        autor: req.session.usuario.nome,
        titulo: titulo,
        conteudo: conteudo,
        feedbacks: []
    };

    poemasDoBanco.push(novoPoema);
    res.redirect('/blog'); // Atualiza a página e o poema novo já aparece!
});

// Rota para o PROFESSOR enviar um feedback (Simulado)
router.post('/feedback/:idPoema', garantirAutenticacao, function(req, res) {
    const idPoema = req.params.idPoema;
    const { textoFeedback } = req.body;

    const poema = poemasDoBanco.find(p => p._id === idPoema);

    if (poema) {
        poema.feedbacks.push({
            professor: req.session.usuario.nome,
            texto: textoFeedback
        });
    }

    res.redirect('/blog'); // Atualiza a página mostrando o feedback!
});

module.exports = router;

