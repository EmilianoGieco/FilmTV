const User = require('../../models/User');

function usuarioLogueoMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailCookie = req.cookies.userEmail;
    let usuarioCookie = User.findByField("email", emailCookie)
   
    if(usuarioCookie){
        req.session.userLogged = usuarioCookie;
    }

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        //res.locals.userLogged = res.session.userLogged;

    }

    next();
}

module.exports = usuarioLogueoMiddleware;

