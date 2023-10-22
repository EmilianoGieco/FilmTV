const { Usuario } = require('../database/models');
const db = require("../database/models");

async function usuarioLogueoMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailCookie = req.cookies.userEmail;

    try {
        if (req.cookies.userEmail) {
            let usuarioCookie = await db.usuario.findOne({
                where: { correo: req.cookies.userEmail }
            });
            req.session.userLogged = usuarioCookie;
        }

        // Configura res.locals.fotoPerfil incluso si no hay cookie pero hay sesión
        res.locals.fotoPerfil = req.session.userLogged;

        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }

        next();
    } catch (error) {
        console.error("Error");
        next();
    }
}

module.exports = usuarioLogueoMiddleware;
