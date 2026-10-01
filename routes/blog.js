var express = require('express');
var router = express.Router();

// Rota GET existente que renderiza a sua página do blog/login
router.get('/', function(req, res, next) {
  res.render('blog', { title: 'Blog - Login' });
});

// NOVA ROTA POST: Processa os dados que o formulário enviou
router.post('/login', function(req, res, next) {
  // Pega o valor selecionado no <select name="tipoUsuario">
  const { tipoUsuario } = req.body;

  // Redireciona o usuário para a página correta no navegador
  if (tipoUsuario === 'professor') {
    res.redirect('/professor');
  } else {
    res.redirect('/aluno');
  }
});

module.exports = router;
