import { NextFunction, Request, Response } from 'express';
import GenerateToken from '../util/generateToken';
import Users from '../database/models/Users';

class TokenValidation {
  constructor(private generateToken = new GenerateToken()) { }

  validation = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: 'Token not found' });
    }

    try {
      const decoded = this.generateToken.decode(token);
      const user = await Users.findOne({ where: { id: decoded.data.id } });

      if (!user) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default TokenValidation;