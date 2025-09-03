// apps/api/src/common/firebase.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

function initAdmin() {
  // Option A: Use env vars (recommended for Railway/Render)
  //   FIREBASE_ADMIN_PROJECT_ID
  //   FIREBASE_ADMIN_CLIENT_EMAIL
  //   FIREBASE_ADMIN_PRIVATE_KEY  (keep \n as literal newlines)
  const {
    FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY,
    GOOGLE_APPLICATION_CREDENTIALS, // Option B: path to JSON file
  } = process.env;

  if (!admin.apps.length) {
    if (
      FIREBASE_ADMIN_PROJECT_ID &&
      FIREBASE_ADMIN_CLIENT_EMAIL &&
      FIREBASE_ADMIN_PRIVATE_KEY
    ) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else if (GOOGLE_APPLICATION_CREDENTIALS) {
      // Uses file path to a service-account JSON (dev only)
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    } else {
      // Last resort: try application default creds (gcloud, etc.)
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
  }
  return admin.app();
}

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor() {
    initAdmin();
  }

  async verifyIdToken(idToken: string) {
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      return decoded; // contains uid, email, etc.
    } catch (err) {
      this.logger.warn(`verifyIdToken failed: ${(err as Error).message}`);
      throw err;
    }
  }
}
