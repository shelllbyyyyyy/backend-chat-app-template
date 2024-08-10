import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { ApplicationModule } from '@/application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ProfileController,
    // ChatController,
  ],
})
export class HttpModule {}
