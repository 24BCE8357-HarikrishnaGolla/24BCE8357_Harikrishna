const ROLES = require("../constants/roles");

function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  if (req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  next();
}

module.exports = adminMiddleware;