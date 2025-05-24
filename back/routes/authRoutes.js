const express = require('express');
const router = express.Router();
const Administrador = require('../models/Administrador');

// Rota de login com verificação no banco de dados
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const admin = await Administrador.findOne({ where: { email, senha } });

    if (!admin) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    req.session.admin = true;
    res.json({ mensagem: 'Login realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro no login', erro: error.message });
  }
});

// Rota de logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao sair' });
    res.clearCookie('connect.sid');
    res.json({ mensagem: 'Logout efetuado com sucesso' });
  });
});

module.exports = router;
