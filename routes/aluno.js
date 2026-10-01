var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('aluno', {titutlo: 'Pagina dos poetas'})
})

module.exports = router;