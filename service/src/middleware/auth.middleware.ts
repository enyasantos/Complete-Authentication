import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ITokenPayload from '../interfaces/token.interface'
import endpoint from '../../endpoints.config'

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema)) {
    return res.status(401).json({ error: 'Malformed token' });
  }

  try {
    //Decode token
    const data = jwt.verify(token, endpoint.KEYJWT);

    const { id } = data as ITokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}