import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

import { RegisterDTO } from '@/application/modules/auth/dtos/register.dto';
import { LoginDTO } from '@/application/modules/auth/dtos/login.dto';

import { User } from '@/domain/entities/user/user.entity';

import { BcryptService } from '@/shared/bcrypt';
import { config } from '@/shared/env/config';
import { UserService } from '@/domain/services/user/user.service';
import { Response } from 'express';

abstract class AuthService {
  abstract login(
    data: LoginDTO,
    resposne: Response,
  ): Promise<{ access_token: string; refresh_token: string }>;
  abstract register(data: RegisterDTO): Promise<User>;
  abstract validateUserCredential(
    email: string,
    password: string,
  ): Promise<User>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userDomainService: UserService,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    data: LoginDTO,
    resposne: Response,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const expirationAccessToken = new Date();
    expirationAccessToken.setMilliseconds(
      expirationAccessToken.getTime() + 360000,
    );

    const expirationRefreshToken = new Date();
    expirationRefreshToken.setMilliseconds(
      expirationRefreshToken.getTime() + 6084000,
    );

    const user = await this.validateUserCredential(data.email, data.password);
    const payload = { name: user.getUsername(), sub: user.getId() };

    const access_token = this.jwtService.sign(payload, {
      secret: config.accessTokenSecret,
      expiresIn: '1m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: config.refreshTokenSecret,
      expiresIn: '1d',
    });

    resposne.cookie('Auntentication', access_token, {
      httpOnly: true,
      secure: true,
      expires: expirationAccessToken,
    });

    resposne.cookie('Refresh', refresh_token, {
      httpOnly: true,
      secure: true,
      expires: expirationRefreshToken,
    });

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async validateUserCredential(email: string, password: string): Promise<User> {
    const user =
      await this.userDomainService.findUserByEmailWithPassword(email);

    if (!user) throw new UnprocessableEntityException('User not found ...!');

    const dbPassword = user.getPassword();

    const compare = await this.bcrypt.comparePassword(password, dbPassword);

    if (!compare) throw new UnauthorizedException('Password not match ...!');

    return user;
  }

  async register(data: RegisterDTO): Promise<User> {
    const id = randomUUID();
    const { username, email, password } = data;

    const hashPassword = await this.bcrypt.hashPassword(password);

    const user = await this.userDomainService.findUserByEmail(email);

    if (user) throw new UnprocessableEntityException();

    const newUser = User.register({
      id,
      username,
      email,
      password: hashPassword,
    });

    return await this.userDomainService.create(newUser);
  }
}
