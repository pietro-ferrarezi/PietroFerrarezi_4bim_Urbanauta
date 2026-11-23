function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    res.redirect("/login")
  }

  next();
}

export default authMiddleware