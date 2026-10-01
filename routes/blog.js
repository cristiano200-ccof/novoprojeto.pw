const express = require('express');
const router = express.Router();

// Rota para carregar o mural de poemas
router.get('/', (req, res) => {
    // Pega o usuário logado na sessão (se houver)
    const usuarioLogado = req.session.user || null; 
    
    // Renderiza o arquivo views/blog.ejs
    res.render('blog', { usuario: usuarioLogado }); 
});

module.exports = router;
