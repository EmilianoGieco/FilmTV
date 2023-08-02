const express = require('express');
const router = express.Router();

const usuarioController = require ('./../controllers/usuarioController');

//formulario de login
router.get('/login', usuarioController.usuario);

//formulario de registro
router.get('/register', usuarioController.registro);

//procesar el registro
router.post('/register', usuarioController.procesarRegistro);

//formulario de Usuario
//router.get('/perfilUsuario', usuarioController.perfilUsuario);

router.get('/CrearFilm', usuarioController.getCrearFilm);
router.post('/CrearFilm', usuarioController.postCrearFilm);

module.exports = router;