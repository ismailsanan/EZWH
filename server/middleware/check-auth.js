const isAuthenticated = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.sendStatus(401);
  }
  next();
};

module.exports = {
  isAuthenticated,
};
