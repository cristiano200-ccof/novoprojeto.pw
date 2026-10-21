var express = require('express');
var router = express.Router();

// Middleware de proteção
function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    }
    res.redirect('/');
}

// Rota principal do blog (Acessada via /blog)
router.get('/', verificarAutenticacao, (req, res) => {
    // Passamos os dados do usuário para a página do blog também
    res.render('blog', { usuario: req.session.usuario });
});

module.exports = router;

