const express = require('express');
const gastoController = require ('../controller/gastoController.js');
const router = express.Router();

router.post('/',gastoController.inserir);

module.exports= router;