import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';

import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PersistenceModule, AuthModule, ProfileModule, UserModule],
  exports: [AuthModule, ProfileModule, UserModule],
})
export class ApplicationModule {}
