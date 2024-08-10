import { User } from '@/domain/entities/user/user.entity';
import { UserRepository } from '@/domain/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(data: User): Promise<User> {
    return this.repository.create(data);
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findUserById(id: string): Promise<User> {
    return await this.repository.findUserById(id);
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return await this.repository.findUserWithPassword(email);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.repository.findUser(email);
  }

  async update(data: User): Promise<User> {
    return await this.repository.update(data);
  }
}
