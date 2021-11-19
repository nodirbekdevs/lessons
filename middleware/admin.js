const IsAdminUser = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send('Murojaat rad etildi');
  next();
}
module.exports = IsAdminUser
