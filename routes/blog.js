const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
 //   const usuarioLogado = req.session.user || null; 
    
    res.render('blog'); 
});

module.exports = router;