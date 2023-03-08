const { hasUserRoute } = require("../util");

const hasUserRoutes = (req, res, next) => {
  const result = hasUserRoute(req.url);
  if (!result) {
    res.sendStatus(500);
  } else {
    next();
  }
};

module.exports = {
  hasUserRoutes,
};
