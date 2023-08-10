function usuarioMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('perfilUsuario');
	}
	next();
}

module.exports = usuarioMiddleware;

