module.exports = function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  } else {
    return res.status(401).json({ mensagem: 'Não autorizado. Faça login.' });
  }
};