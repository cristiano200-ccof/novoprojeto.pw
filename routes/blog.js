const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
 //   const usuarioLogado = req.session.user || null; 
    
    res.render('blog'); 
});

module.exports = router;