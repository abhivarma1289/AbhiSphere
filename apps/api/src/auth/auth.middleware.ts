import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseService } from '../common/firebase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly firebase: FirebaseService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    // Allow CORS preflight
    if (req.method === 'OPTIONS') return next();

    // Public routes
    if (
      req.path.startsWith('/health') ||
      req.path.startsWith('/docs') ||
      req.path.startsWith('/docs-json')
    ) {
      return next();
    }

    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Bearer token');
    }
    const token = auth.slice('Bearer '.length).trim();

    try {
      const decoded = await this.firebase.verifyIdToken(token);
      // @ts-ignore attach user for controllers
      req.user = { uid: decoded.uid, email: decoded.email };
      return next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
