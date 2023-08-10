//const { log } = require('console');
const bcryptjs = require('bcryptjs');
//const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../../models/User');
//const { error } = require('console');


const controlador = {
    usuario: (req, res) => {
        res.render('./user/login');
    },

    //realizando
    procesarlogin: (req, res) => {
        const usuarioLogueo = User.findByField('email', req.body.email);

        if (usuarioLogueo) {
            let contrasenaOk = bcryptjs.compareSync(req.body.password, usuarioLogueo.password);
            if (contrasenaOk) {
                return res.redirect("perfilUsuario");
            } else {

                return res.render('./user/login', {
                    errors: {
                        password: {
                            msg: "Contraseña incorrecta"
                        }
                    },
                    oldData: req.body
                });
            }
        }
        else {

            return res.render('./user/login', {
                errors: {
                    email: {
                        msg: "el email con el que intenta ingresar no existe"
                    }
                },
            });
        }
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

        let usuarioBD = User.findByField("email", req.body.email);

        if (usuarioBD) {
            return res.render('user/register', {
                errors: {
                    email: {
                        msg: "Este email ya esta registrado"
                    }
                },
                oldData: req.body
            });
        }

        let usuarioCreacion = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            //passwordD: bcryptjs.hashSync(req.body.password, 10),
            imagen: req.file.filename
        }

        let nuevoUsuario = User.create(usuarioCreacion);
        return res.render('user/login');
    },

    perfilUsuario: function (req, res) {

        return res.render("./user/perfilUsuario");
    },

    getCrearFilm: (req, res) => {
        res.render('./user/CrearFilm')
    },

    postCrearFilm: function (req, res) {

        console.log(req.body)
    }

};

module.exports = controlador;