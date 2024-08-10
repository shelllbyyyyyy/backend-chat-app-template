import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ApplicationModule } from '@/application/application.module';

import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    PersistenceModule.register({
      global: true,
    }),
    PresentationModule.register({
      global: true,
    }),
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
