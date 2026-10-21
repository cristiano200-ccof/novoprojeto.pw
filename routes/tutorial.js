var express = require('express');
var router = express.Router();

// Middleware: Se não estiver logado, manda de volta para a tela de login
function verificarAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); // Está logado, pode continuar!
    }
    res.redirect('/'); // Não está logado, bloqueia e redireciona
}

// Rota principal do tutorial (Acessada via /tutorial)
router.get('/', verificarAutenticacao, (req, res) => {
    // Passamos os dados do usuário que salvamos no login para a página EJS
    res.render('tutorial', { usuario: req.session.usuario });
});

module.exports = router;

