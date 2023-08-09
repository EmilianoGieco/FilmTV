const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const { body } = require("express-validator");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/imagenes");
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

//corregir esto
const uploadFile = multer({storage});

const usuarioController = require('./../controllers/usuarioController');

//validaciones del registro
const validacion = [
    body("email").notEmpty().withMessage("Escribe un correo electrónico").bail().isEmail().withMessage("El correo electrónico no es válido"),
    body("password").notEmpty().withMessage("Escribe una contraseña"),
    body("passwordD").notEmpty().withMessage("Vuelve a escribir la contraseña").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
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
router.get('/login', usuarioController.usuario);

//formulario de registro
router.get('/register', usuarioController.registro);

//procesar el registro
router.post('/register', validacion ,uploadFile.single("imagen"), usuarioController.procesarRegistro);

//formulario de Usuario
//router.get('/perfilUsuario', usuarioController.perfilUsuario);

router.get('/CrearFilm', usuarioController.getCrearFilm);
router.post('/CrearFilm', usuarioController.postCrearFilm);

module.exports = router;