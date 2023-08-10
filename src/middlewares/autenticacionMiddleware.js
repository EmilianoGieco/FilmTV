function autenticacionMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.redirect('/usuarios/login');
	}
	next();
}

module.exports = autenticacionMiddleware;