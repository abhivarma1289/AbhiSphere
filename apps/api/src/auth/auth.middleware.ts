import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseService } from '../common/firebase.service';
import { HEADER_AUTH } from '../common/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly firebase: FirebaseService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') return next();
    const authHeader = req.headers[HEADER_AUTH] as string | undefined;
    const decoded = await this.firebase.verifyToken(authHeader);
    (req as any).user = { uid: decoded.uid, email: decoded.email };
    next();
  }
}
