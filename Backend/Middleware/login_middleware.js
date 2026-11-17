function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Não autenticado"
    });
  }

  next();
}