var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('professor', {titutlo: 'Pagina do avaliador'})
})

module.exports = router;