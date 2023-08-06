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

    /*procesarRegistro:    (req, res) => {
        return res.send({
        body:req.body,
        file:req.file
        });
        },*/

        
  procesarRegistro: (req, res) => { 
        const validaciones = validationResult(req);
        console.log(validaciones);
        const errors = validaciones.mapped();
        console.log(errors);
    
        if (!validaciones.isEmpty()) {
           /* return res.render('user/register', {
                errors: errors, 
            });*/
            return res.send({
                body:req.body})
        }},
    
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