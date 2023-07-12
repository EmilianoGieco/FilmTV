const usuarioController = require ('./../controllers/usuarioController');

const express = require('express');
const router = express.Router();


router.get('/login', usuarioController.usuario);
router.get('/register', usuarioController.registro);

module.exports = router;