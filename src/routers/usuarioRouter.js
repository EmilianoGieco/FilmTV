const express = require('express');
const router = express.Router();
const path = require('path');

// Middlewares
const multer = require("multer");
const { body } = require("express-validator");

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/imagenes");
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage: multerDiskStorage });
const autenticacionMiddleware = require('../middlewares/autenticacionMiddleware');
const usuarioMiddleware = require('../middlewares/usuarioMiddleware');


const usuarioController = require('./../controllers/usuarioController');

//validaciones del registro
const validacion = [
    body("email").notEmpty().withMessage("Escribe un correo electrónico").bail().isEmail().withMessage("El correo electrónico no es válido"),
    body("password").notEmpty().withMessage("Escribe una contraseña"),
    body("nombreUsuario").notEmpty().withMessage("Escribe un nombre de usuario"),
    body('imagen').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Cargar una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
]

//formulario de login
router.get('/login', usuarioMiddleware, usuarioController.usuario);

//procesar el login
router.post('/login', usuarioController.procesarlogin);

//formulario de registro
router.get('/register',usuarioMiddleware, usuarioController.registro);

//procesar el registro
router.post('/register', uploadFile.single("imagen"), validacion, usuarioController.procesarRegistro);

//formulario de Usuario
router.get('/perfilUsuario', autenticacionMiddleware, usuarioController.perfilUsuario);

//Cerrar sesión
router.get('/cerrarSesion',usuarioController.cerrarSesion);

router.get('/CrearFilm', usuarioController.getCrearFilm);
router.post('/CrearFilm',  usuarioController.postCrearFilm);

module.exports = router;