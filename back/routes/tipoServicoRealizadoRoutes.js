const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoServicoRealizadoController');
const isAuthenticated = require('../middlewares/isAuthenticated');

// ROTA PÚBLICA
router.get('/', controller.listar);

// ROTAS PROTEGIDAS
router.post('/', isAuthenticated, controller.criar);
router.put('/:id', isAuthenticated, controller.atualizar);
router.delete('/:id', isAuthenticated, controller.deletar);

module.exports = router;

