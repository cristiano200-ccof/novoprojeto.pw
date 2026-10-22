const express = require('express');
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

module.exports = router;
