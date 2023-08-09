//const { log } = require('console');
const bcrypt = require('bcryptjs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../../models/User');


const controlador = {
    usuario: (req, res) => {
        res.render('./user/login');
    },

    registro: (req, res) => {
        res.render('./user/register');
    },

    procesarRegistro: (req, res) => {
        const validaciones = validationResult(req);

        console.log(validaciones);
        const errors = validaciones.mapped();
        console.log(errors);

        if (!validaciones.isEmpty()) {
            return res.render('user/register', {
                errors: errors,
                oldData: req.body
            });

        }

        let usuarioCreaImg = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            passwordD: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file.filename
        }

        User.create(usuarioCreaImg);
        return res.send('Ok, las validaciones se pasaron y no tienes errores');
    },

    /*perfilUsuario: function (req, res) {

        return res.render("perfilUsuario");
    },*/

    getCrearFilm: (req, res) => {
        res.render('./user/CrearFilm')
    },

    postCrearFilm: function (req, res) {

        console.log(req.body)
    }

};

module.exports = controlador;