import { Request, Response, NextFunction } from 'express';
import { Role } from '../interfaces/role.enum';

const roleMiddleware = (requiredRole: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Access denied. No user logged in.' });
    }

    const userRole = req.user.role;

    if (userRole !== requiredRole) {
      return res.status(403).send({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

export default roleMiddleware;
