export const adminAuth = async (req, res, next) => {
    try {
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Access denied. Admin privileges required.' 
        });
      }
      next();
    } catch (error) {
      res.status(403).json({ message: 'Access denied' });
    }
  };