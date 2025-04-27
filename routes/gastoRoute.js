const express = require('express');
const gastoController = require('../controller/gastoController.js');
const router = express.Router();


router.post('/', gastoController.inserir);
router.delete('/:id', gastoController.Deletar);
router.put('/:id', gastoController.Atualizar);
router.get('/BuscaPorID/:id', gastoController.BuscaPorID);
router.get('/BuscarPorFiltro/', gastoController.BuscarPorFiltro);

module.exports = router;
