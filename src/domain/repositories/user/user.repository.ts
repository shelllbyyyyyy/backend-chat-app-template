import { Injectable } from '@nestjs/common';

import { User } from '../../entities/user/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract create(data: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findUserById(id: string): Promise<User>;
  abstract findUser(email: string): Promise<User>;
  abstract findUserWithPassword(email: string): Promise<User>;
  abstract update(data: User): Promise<User>;
}
