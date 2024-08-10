import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UserService } from '@/domain/services/user/user.service';

import { config } from '@/shared/env/config';
import { BcryptService } from '@/shared/bcrypt';

import { AuthServiceImpl } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [
    AuthServiceImpl,
    LocalStrategy,
    JwtStrategy,
    UserService,
    BcryptService,
    JwtService,
  ],
  exports: [AuthServiceImpl, UserService, BcryptService, JwtService],
})
export class AuthModule {}
