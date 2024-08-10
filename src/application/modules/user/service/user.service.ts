import { Injectable } from '@nestjs/common';

import { User } from '@/domain/entities/user/user.entity';
import { UserService as UserDomainService } from '@/domain/services/user/user.service';

abstract class UserService {
  abstract findAll(): Promise<User[]>;
  abstract findOne(email: string): Promise<User>;
}

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly service: UserDomainService) {}

  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  async findOne(email: string): Promise<User> {
    return await this.service.findUserByEmail(email);
  }
}
