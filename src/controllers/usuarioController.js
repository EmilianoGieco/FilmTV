const { log } = require('console');
const path = require('path');
const { validationResult } = require('express-validator');

const controlador = {
    usuario: (req, res) => {
        res.render(path.resolve(__dirname, '../views/user/login.ejs'));
    },

    registro: (req, res) => {
        res.render(path.resolve(__dirname, '../views/user/register.ejs'));
    },

    procesarRegistro: (req, res) => {
        const validaciones = validationResult(req);

        if (validaciones.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
        }
    },

    /*perfilUsuario: function (req, res) {

        return res.render("perfilUsuario");
    },*/

    getCrearFilm: (req, res) => {
        res.render(path.resolve(__dirname, '../views/user/CrearFilm.ejs'))
    },

    postCrearFilm: function (req, res) {

        console.log(req.body)
    }


};

module.exports = controlador;