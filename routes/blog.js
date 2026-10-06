const express = require('express');
const router = express.Router();

function garantirAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); 
    }
    
    res.redirect('/'); 
}

router.get('/', function(req, res, next) {
        res.render('blog'); 
});

module.exports = router;
