import { Module } from '@nestjs/common';

import { UserServiceImpl } from './service/user.service';
import { UserService } from '@/domain/services/user/user.service';

@Module({
  providers: [UserServiceImpl, UserService],
  exports: [UserServiceImpl, UserService],
})
export class UserModule {}
