var express = require('express')
var router = express.Router()

function garantirAutenticacao(req, res, next) {
  if (req.session && req.session.usuario) {
      return next(); 
  }
  
  res.redirect('/'); 
}


router.get('/', function(req, res, next) {
  res.render('tutorial', {titutlo: 'Tutorial'})
})

module.exports = router;