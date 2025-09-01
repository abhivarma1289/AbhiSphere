import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly app: admin.app.App;

  constructor() {
    if (!admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    } else {
      this.app = admin.app();
    }
  }

  async verifyToken(authHeader?: string) {
    if (!authHeader?.startsWith('Bearer '))
      throw new UnauthorizedException('Missing token');

    const idToken = authHeader.split(' ')[1];
    try {
      return await this.app.auth().verifyIdToken(idToken);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
