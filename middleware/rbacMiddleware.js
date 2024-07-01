const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    // Add more roles as needed
  };
  
  const rbacMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };
  };
  
  module.exports = { rbacMiddleware, ROLES };