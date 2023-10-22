const indexController = require ('./../controllers/indexController');

const express = require('express');
const router = express.Router();

router.get('/', indexController.index);

router.post("/buscar", indexController.buscar); 

router.get('/', indexController.fotoPerfil);



module.exports = router;

