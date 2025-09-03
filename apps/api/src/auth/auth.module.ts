import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { FirebaseService } from '../common/firebase.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.ALL },
        { path: 'docs', method: RequestMethod.ALL },
        { path: 'docs-json', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
