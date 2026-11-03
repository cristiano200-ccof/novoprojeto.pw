const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 1. CRIANDO A ESTRUTURA DO POEMA NO MONGODB ATLAS
const PoemaSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    autor: String,
    feedbacks: [String] // Salva uma lista de textos de feedback dos professores
});

// Se o modelo já existir ele usa o existente, senão cria um novo
const Poema = mongoose.models.Poema || mongoose.model('Poema', PoemaSchema);

// Middleware que bloqueia quem não estiver logado (Mantido da sua simulação)
function garantirAutenticacao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next(); 
    }
    res.redirect('/'); 
}

// 2. ROTA PRINCIPAL: Busca os poemas reais do MongoDB Atlas
router.get('/', garantirAutenticacao, async function(req, res, next) {
    try {
        // Busca todos os poemas salvos no banco de dados real
        const poemasDoBancoReal = await Poema.find({});

        res.render('blog', { 
            titulo: 'Blog', 
            usuario: req.session.usuario,
            poemas: poemasDoBancoReal
        }); 
    } catch (err) {
        console.error("Erro ao buscar poemas no MongoDB:", err);
        res.status(500).send("Erro interno ao carregar a página.");
    }
});

// 3. ROTA PARA O ALUNO POSTAR UM NOVO POEMA NO BANCO DE DADOS
router.post('/postar', garantirAutenticacao, async function(req, res) {
    try {
        const { titulo, conteudo } = req.body;
        
        const novoPoema = new Poema({
            autor: req.session.usuario.nome,
            titulo: titulo,
            conteudo: conteudo,
            feedbacks: []
        });

        // Salva permanentemente no MongoDB Atlas
        await novoPoema.save();
        res.redirect('/blog'); 
    } catch (err) {
        console.error("Erro ao salvar poema:", err);
        res.status(500).send("Erro ao publicar o poema.");
    }
});

// 4. ROTA PARA O PROFESSOR ENVIAR UM FEEDBACK NO BANCO DE DADOS
// Nota: Ajustado para '/feedback/:id' para bater exatamente com o 'poema.id' do seu arquivo blog.ejs
router.post('/feedback/:id', garantirAutenticacao, async function(req, res) {
    try {
        const idPoema = req.params.id;
        const { textoFeedback } = req.body;
        const nomeProfessor = req.session.usuario.nome;

        // Formata o texto juntando o nome do professor com a avaliação
        const feedbackFormatado = `${nomeProfessor}: ${textoFeedback}`;

        // Procura pelo ID gerado pelo MongoDB e insere o feedback na lista
        await Poema.findByIdAndUpdate(idPoema, {
            $push: { feedbacks: feedbackFormatado }
        });

        res.redirect('/blog'); 
    } catch (err) {
        console.error("Erro ao salvar feedback:", err);
        res.status(500).send("Erro ao enviar a avaliação.");
    }
});

module.exports = router;
