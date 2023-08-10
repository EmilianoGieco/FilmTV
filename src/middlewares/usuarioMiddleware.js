function usuarioMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/usuarios/perfilUsuario');
	}
	next();
}

module.exports = usuarioMiddleware;

